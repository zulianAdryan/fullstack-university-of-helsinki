export interface IHeader {
  name: string;
}

export interface ITotal {
  total: number;
}

export interface Courses {
  courses: CoursePart[];
}

interface CoursePartBase {
  name: string;
  exerciseCount: number;
}

interface CoursePartBaseDescriptionExtended extends CoursePartBase {
  description: string;
}

interface CoursePartBasic extends CoursePartBaseDescriptionExtended {
  kind: "basic";
}

interface CoursePartGroup extends CoursePartBase {
  groupProjectCount: number;
  kind: "group";
}

interface CoursePartBackground extends CoursePartBaseDescriptionExtended {
  backgroundMaterial: string;
  kind: "background";
}

interface CoursePartSpecial extends CoursePartBaseDescriptionExtended {
  requirements: string[];
  kind: "special";
}

export type CoursePart =
  | CoursePartBasic
  | CoursePartGroup
  | CoursePartBackground
  | CoursePartSpecial;
