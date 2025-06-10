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

        public async Task<int?> InsertReaction(Reaction reaction)
        {
            var insertedReaction = await _context.InsertReactionAsync(reaction);
            if (!insertedReaction.IsSuccess)
                return null;
            return insertedReaction.Payload;
        }
    }
}
