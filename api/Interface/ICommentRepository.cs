using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Comments;
using api.Model;

namespace api.Interface
{
    public interface ICommentRepository
    {
        Task<List<CommentDTO?>> GetAllComments(int? chatId);

        Task<int?> CreateComment(Comment comment);

        Task<bool?> DeleteComment(int commentId);
    }
}
