using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;

namespace api.Interface
{
    public interface IReactionRepository
    {
        Task<int?> InsertReaction(Reaction reaction);
    }
}
