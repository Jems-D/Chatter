using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Comments;
using api.Model;

namespace api.Mappers.Comments
{
    public static class CommentMappers
    {
        public static CommentDTO ToCommentDTOFromComment(this Comment comment)
        {
            return new CommentDTO
            {
                CommentId = comment.CommentId,
                CreatedById = comment.CreatedById,
                ChatId = comment.ChatId,
                Content = comment.Content,
                CreatedAt = comment.CreatedAt,
                IsDisabled = comment.IsDisabled,
                Username = comment.User.UserName,
            };
        }

        public static Comment ToCommentFromCreateCommentDTO(
            this CreateCommentDTO dto,
            int chatId,
            Guid userId
        )
        {
            return new Comment
            {
                ChatId = chatId,
                Content = dto.Content,
                CreatedById = userId,
            };
        }
    }
}
