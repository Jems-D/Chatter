using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.Interface;
using api.Model;

namespace api.Repository
{
    public class ReactionRepository : IReactionRepository
    {
        private readonly ApplicationDbContext _context;

        public ReactionRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<bool?> DeleteReaction(int reactionId)
        {
            var results = await _context.DeleteReactionsAsync(reactionId);
            if (!results.IsSuccess)
                return null;
            return results.Payload;
        }

        public async Task<int?> InsertReaction(Reaction reaction)
        {
            var insertedReaction = await _context.InsertReactionAsync(reaction);
            if (!insertedReaction.IsSuccess)
                return null;
            return 1;
        }
    }
}
