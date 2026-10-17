// Lesson notes are imported as plain text (see "loader" in angular.json).
declare module '*.md' {
  const content: string;
  export default content;
}
