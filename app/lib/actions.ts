"use server";

import { createClient } from "@supabase/supabase-js";
import { Photo } from "./definitions";
import { Gallery } from "./definitions";

const supabase = createClient(process.env.SUPABASE_URL!, process.env.SUPABASE_KEY!);

export async function getEntrancePhoto() {
  const { data, error } = await supabase.from("photos").select("*").eq("page_id", 1);

  if (error) {
    console.error(error);
    throw new Error("Error fetching entrance photo");
    // Display error handling to client
  }

  if (data && data.length === 1) {
    const { id, description, url, width_px, height_px } = data[0];
    return {
      id,
      description,
      url,
      width: width_px,
      height: height_px,
    };
  }
}

export async function getHomePhotos() {
  // Remote Procedure Call stored in Supabase dashboard
  const { data, error } = await supabase.rpc("get_random_bg_photos");

  if (error) {
    console.error(error);
    throw new Error("Error fetching homepage photos");
    // Display error handling to client
  }

  if (data && data.length > 0) {
    return data.map((p: any) => {
      const { id, description, url, width_px, height_px } = p;
      return {
        id,
        description,
        url,
        width: width_px,
        height: height_px,
      };
    });
  }
}

export async function getGalleriesPagePhotos() {
  // not() prevents the "none" gallery from being included
  const { data: galleries, error } = await supabase
    .from("galleries")
    .select("*")
    .not("id", "eq", 7);

  if (error) {
    console.error(error);
    throw new Error("Error fetching Galleries page photos");
    // Display error handling to client
  }

  if (galleries && galleries.length > 0) {
    return galleries.map((g: Gallery) => {
      const { id, name, cover_url, cover_width_px, cover_height_px, description } = g;
      return {
        id,
        name,
        cover_url,
        cover_width_px,
        cover_height_px,
        description,
      };
    });
  }
}

export async function getGalleryPhotos(galleryId: number) {
  const { data: galleryPhotos, error } = await supabase
    .from("photos")
    .select("*")
    .eq("page_id", 3)
    .eq("gallery_id", galleryId);

  if (error) {
    console.error(error);
    throw new Error(`Error fetching photos for Gallery #${galleryId}`);
    // Display error handling to client
  }

  if (galleryPhotos && galleryPhotos.length > 0) {
    return galleryPhotos.map((p: any) => {
      const { id, description, url, width_px, height_px } = p;
      return {
        id,
        description,
        url,
        width: width_px,
        height: height_px,
      };
    });
  }
}

export async function submitContactForm(e: any) {
  e.preventDefault();

  // Email contact form info to my email address

  // return some trigger to display success message
}
