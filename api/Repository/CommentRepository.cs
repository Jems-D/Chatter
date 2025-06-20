using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Comments;
using api.Interface;
using api.Mappers.Comments;
using api.Model;
using Microsoft.Identity.Client;

namespace api.Repository
{
    public class CommentRepository : ICommentRepository
    {
        private readonly ApplicationDbContext _context;

        public CommentRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int?> CreateComment(Comment comment)
        {
            var createdComment = await _context.InsertCommentAsync(comment);
            if (!createdComment.IsSuccess)
                return null;
            return createdComment.Payload;
        }

        public async Task<int?> DeleteComment(int commentId)
        {
            var result = await _context.DeleteCommentAsync(commentId);
            if (!result.IsSuccess)
                return null;
            if (result.Payload == 0)
                return null;
            return result.Payload;
        }

        public async Task<List<CommentDTO?>> GetAllComments(int? chatId)
        {
            var comments = await _context.GetAllCommentAsync(chatId);
            if (!comments.IsSuccess)
            {
                return null;
            }
            return comments?.Payload?.Select(s => s?.ToCommentDTOFromComment()).ToList()!;
        }
    }
}
