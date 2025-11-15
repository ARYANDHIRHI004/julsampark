import React, { useEffect } from "react";
import userQueryStore from "../stores/useUserQueryStore";
import { Loader2, MessageSquare, Clock, User, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";

const AdminSideUserQueries = () => {
  const {
    allQueries,
    isFetchingAllQueries,
    getAllQuery,
  } = userQueryStore();

  useEffect(() => {
    getAllQuery();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] p-4 md:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6 md:mb-8 pl-16 lg:pl-0">
          <h1 className="text-2xl sm:text-3xl lg:text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-2 md:gap-3">
            <MessageSquare className="text-cyan-400" size={28} />
            User Queries
          </h1>
          <p className="text-gray-400 mt-2 text-sm md:text-base">Monitor and respond to citizen reports</p>
        </div>

        {/* Queries List */}
        <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-4 md:p-6 border border-cyan-500/20">
          {isFetchingAllQueries ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-cyan-400" size={48} />
            </div>
          ) : allQueries && allQueries.length > 0 ? (
            <div className="space-y-3 md:space-y-4">
              {allQueries.map((query) => (
                <Link key={query._id} to={`/user/${query._id}`}>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 hover:from-cyan-500/20 hover:to-blue-500/20 border border-cyan-500/30 rounded-xl p-4 md:p-5 transition-all duration-300 hover:shadow-lg hover:shadow-cyan-500/20 hover:scale-[1.02] group">
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-2 flex-wrap">
                          <User className="text-cyan-400 flex-shrink-0" size={16} />
                          <span className="text-xs md:text-sm font-medium text-gray-400 truncate">
                            {query.name || "Anonymous User"}
                          </span>
                        </div>
                        <p className="text-white font-medium text-sm md:text-lg mb-2 line-clamp-2">
                          {query.query || query.message}
                        </p>
                        <div className="flex items-center gap-3 md:gap-4 text-xs md:text-sm text-gray-400 flex-wrap">
                          <span className="flex items-center gap-1">
                            <Clock size={14} className="flex-shrink-0" />
                            <span className="truncate">{query.createdAt ? new Date(query.createdAt).toLocaleDateString() : "Recent"}</span>
                          </span>
                          <span className="px-2 md:px-3 py-1 bg-cyan-500/20 text-cyan-400 rounded-full text-xs font-medium whitespace-nowrap">
                            {query.issueType || query.queryType || "General"}
                          </span>
                        </div>
                      </div>
                      <ArrowRight className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity flex-shrink-0" size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <MessageSquare className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400 text-base md:text-lg">No queries submitted yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminSideUserQueries;