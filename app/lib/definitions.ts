export type NavLink = {
  name: string;
  href: string;
};

export type Photo = {
  id: number;
  description: string;
  url: string;
  width: number;
  height: number;
};

export type Gallery = {
  id: number;
  name: string;
  cover_url: string;
  cover_width_px: number;
  cover_height_px: number;
  description: string;
};

export type Section = {
  title: string;
  content: string;
};

export type ToggleStates = {
  [key: string]: boolean;
};

export type ToggleAction = {
  type: "TOGGLE";
  section: "aboutMe" | "aboutSite" | "aboutPhotos";
};

// export type GalleryNavStates = {
//   current: number;
//   prev?: number;
//   next?: number;
//   currentAnimation: string;
//   prevAnimation?: string;
//   nextAnimation?: string;
// };

export type GalleryNavState = {
  photos: GalleryPhotoState[];
  current: number;
}

export type GalleryPhotoState = {
  index: number;
  transition: string;
};

export type GalleryNavAction = {
  type: "NEXT" | "PREV";
};
