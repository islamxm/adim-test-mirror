import {
  Comment,
  CommentDto,
  Lesson,
  LessonDetails,
  LessonDetailsDto,
  LessonDto,
} from "./model";

export const lessonDtoMap = (lessonDto: LessonDto): Lesson => {
  return {
    id: lessonDto.id,
    isFinished: lessonDto.isFinished,
    name: lessonDto.name,
    type: lessonDto.type,
    unitId: lessonDto.unit_id,
  };
};

export const lessonDetailsDtoMap = (
  lessonDetailsDto: LessonDetailsDto
): LessonDetails => {
  return {
    blog: lessonDetailsDto.blog || "",
    commentCount: lessonDetailsDto.commentCount,
    durationMinutes: lessonDetailsDto.duration_minutes,
    id: lessonDetailsDto.id,
    isFinished: lessonDetailsDto.isFinished,
    name: lessonDetailsDto.name,
    nextLessonId: lessonDetailsDto.nextLessonId,
    type: lessonDetailsDto.type,
    video: lessonDetailsDto.video,
  };
};

export const commentDtoMap = (commentDto: CommentDto): Comment => {
  return {
    userAvatar: commentDto.user.avatarUrl,
    userName: commentDto.user.profileName,
    id: commentDto.id,
    isOwn: commentDto.isOwn,
    hasReplies: Boolean(
      commentDto.replies?.length && commentDto.replies.length > 0
    ),
    text: commentDto.text,
    createdAt: commentDto.createdAt
  };
};
