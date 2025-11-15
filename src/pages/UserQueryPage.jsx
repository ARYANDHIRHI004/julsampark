import React, { useEffect } from 'react';
import { useParams } from 'react-router-dom';
import userQueryStore from '../stores/useUserQueryStore';
import { Loader2, MessageSquare, Calendar, MapPin, Tag, User, Mail, Image as ImageIcon } from 'lucide-react';

const UserQueryPage = () => {
  const { queryId } = useParams();
  const { userQueryById, isFetchingQueryById, getPastQueryById } = userQueryStore();

  useEffect(() => {
    getPastQueryById(queryId);
  }, [queryId]);

  return (
    <div className="min-h-screen bg-[#0a0e27] p-6">
      <div className="max-w-4xl mx-auto">
        {isFetchingQueryById ? (
          <div className="flex justify-center items-center py-20">
            <Loader2 className="animate-spin text-cyan-400" size={48} />
          </div>
        ) : userQueryById ? (
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl border border-cyan-500/30 overflow-hidden">
            {/* Header */}
            <div className="bg-gradient-to-r from-cyan-500/20 to-blue-500/20 border-b border-cyan-500/30 p-6">
              <div className="flex items-start justify-between mb-4">
                <h1 className="text-3xl font-bold text-white flex items-center gap-3">
                  <MessageSquare className="text-cyan-400" size={32} />
                  Query Details
                </h1>
                <span className="px-4 py-2 bg-cyan-500/30 text-cyan-400 rounded-full text-sm font-medium border border-cyan-500/50">
                  {userQueryById.issueType || userQueryById.queryType || "General"}
                </span>
              </div>
            </div>

            {/* Content */}
            <div className="p-6 space-y-6">
              {/* Main Query/Message */}
              <div className="bg-black/20 rounded-xl p-5 border border-cyan-500/20">
                <h2 className="text-lg font-semibold text-cyan-400 mb-2">Description</h2>
                <p className="text-white text-lg leading-relaxed">
                  {userQueryById.query || userQueryById.message}
                </p>
              </div>

              {/* User Info */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {userQueryById.name && (
                  <div className="bg-black/20 rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <User className="text-cyan-400" size={20} />
                      <div>
                        <p className="text-xs text-gray-400">Submitted By</p>
                        <p className="text-white font-medium">{userQueryById.name}</p>
                      </div>
                    </div>
                  </div>
                )}

                {userQueryById.email && (
                  <div className="bg-black/20 rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <Mail className="text-cyan-400" size={20} />
                      <div>
                        <p className="text-xs text-gray-400">Email</p>
                        <p className="text-white font-medium">{userQueryById.email}</p>
                      </div>
                    </div>
                  </div>
                )}

                {userQueryById.createdAt && (
                  <div className="bg-black/20 rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <Calendar className="text-cyan-400" size={20} />
                      <div>
                        <p className="text-xs text-gray-400">Submitted On</p>
                        <p className="text-white font-medium">
                          {new Date(userQueryById.createdAt).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                )}

                {(userQueryById.lat && userQueryById.lng) && (
                  <div className="bg-black/20 rounded-xl p-4 border border-cyan-500/20">
                    <div className="flex items-center gap-3">
                      <MapPin className="text-cyan-400" size={20} />
                      <div>
                        <p className="text-xs text-gray-400">Location</p>
                        <p className="text-white font-medium text-sm">
                          {userQueryById.lat.toFixed(6)}, {userQueryById.lng.toFixed(6)}
                        </p>
                      </div>
                    </div>
                  </div>
                )}
              </div>

              {/* Image if exists */}
              {userQueryById.image && (
                <div className="bg-black/20 rounded-xl p-5 border border-cyan-500/20">
                  <h2 className="text-lg font-semibold text-cyan-400 mb-3 flex items-center gap-2">
                    <ImageIcon size={20} />
                    Attached Image
                  </h2>
                  <img
                    src={userQueryById.image.url}
                    alt="Query attachment"
                    className="w-full max-w-md rounded-lg border-2 border-cyan-500/50 shadow-lg"
                  />
                </div>
              )}

              {/* Status/Action Buttons */}
              <div className="flex gap-4 pt-4">
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all">
                  Mark as Resolved
                </button>
                <button className="flex-1 px-6 py-3 bg-gradient-to-r from-orange-500 to-red-500 text-white font-semibold rounded-lg hover:shadow-lg hover:shadow-orange-500/30 transition-all">
                  Escalate
                </button>
              </div>
            </div>
          </div>
        ) : (
          <div className="text-center py-20">
            <MessageSquare className="mx-auto text-gray-600 mb-4" size={64} />
            <p className="text-gray-400 text-lg">Query not found</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default UserQueryPage;