import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import userQueryStore from "../stores/useUserQueryStore";
import { Loader2, MapPin, Camera, Send, MessageSquare, Clock } from "lucide-react";
import { Link } from "react-router-dom";

const UserQuery = () => {
  const { register, handleSubmit, reset } = useForm();
  const [preview, setPreview] = useState("");
  const [location, setLocation] = useState(null);
  const [loadingLoc, setLoadingLoc] = useState(false);
  
  const {
    isSendingQuery,
    userQuery,
    submitQuery,
    getPastQuery,
    isFetchingQuery,
  } = userQueryStore();

  const handleImage = (e) => {
    const file = e.target.files[0];
    if (file) {
      setPreview(URL.createObjectURL(file));
    }
  };

  const fetchLocation = () => {
    setLoadingLoc(true);
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        setLocation({
          lat: pos.coords.latitude,
          lng: pos.coords.longitude,
        });
        setLoadingLoc(false);
      },
      () => {
        setLocation(null);
        setLoadingLoc(false);
      }
    );
  };

  const onSubmit = async (data) => {
    data.lat = location?.lat;
    data.lng = location?.lng;
    await submitQuery(data);
    window.dispatchEvent(new Event("ticketSubmitted"));
    reset();
    setPreview("");
    setLocation(null);
  };

  useEffect(() => {
    getPastQuery();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Notices Section */}
          <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-6 border border-yellow-500/30">
            <h2 className="text-2xl font-bold text-yellow-400 mb-4 flex items-center gap-2">
              <MessageSquare size={24} />
              Notices
            </h2>
            <div className="space-y-3">
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-white font-medium">🚰 Scheduled maintenance in Zone A tomorrow 10 AM - 2 PM</p>
                <span className="text-xs text-gray-400 mt-2 block">Posted 2 hours ago</span>
              </div>
              <div className="bg-gradient-to-r from-yellow-500/20 to-orange-500/20 border border-yellow-500/30 rounded-xl p-4">
                <p className="text-white font-medium">💧 Water conservation drive - Save water, save life</p>
                <span className="text-xs text-gray-400 mt-2 block">Posted 1 day ago</span>
              </div>
            </div>
          </div>

          {/* Submit Query Form */}
          <div className="lg:col-span-2 bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-8 border border-cyan-500/30">
            <div className="mb-6">
              <h2 className="text-3xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
                <Send className="text-cyan-400" size={32} />
                Submit Report / Feedback
              </h2>
              <p className="text-gray-400 mt-2">Help us improve water services in your area</p>
            </div>

            <form onSubmit={handleSubmit(onSubmit)} className="space-y-5">
              {/* Name */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Full Name</label>
                <input
                  {...register("name", { required: true })}
                  placeholder="Your Name"
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              {/* Email */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Email Address</label>
                <input
                  {...register("email", { required: true })}
                  placeholder="you@example.com"
                  type="email"
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                />
              </div>

              {/* Issue Type */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Issue Type</label>
                <select
                  {...register("issueType", { required: true })}
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all"
                >
                  <option value="">Select Issue Type</option>
                  <option value="Complaint">Complaint</option>
                  <option value="Feedback">Feedback</option>
                  <option value="Sensor Issue">Sensor Issue</option>
                  <option value="Water Leakage">Water Leakage</option>
                  <option value="Low Pressure">Low Pressure</option>
                  <option value="No Water Supply">No Water Supply</option>
                </select>
              </div>

              {/* Message */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 block">Description</label>
                <textarea
                  {...register("message", { required: true })}
                  placeholder="Describe your issue in detail..."
                  rows="4"
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-white placeholder-gray-500 focus:border-cyan-500 focus:outline-none focus:ring-2 focus:ring-cyan-500/50 transition-all resize-none"
                />
              </div>

              {/* Image Upload */}
              <div>
                <label className="text-gray-300 text-sm font-medium mb-2 flex items-center gap-2">
                  <Camera size={16} className="text-cyan-400" />
                  Attach Photo (Optional)
                </label>
                <input
                  type="file"
                  accept="image/*"
                  capture="camera"
                  {...register("image")}
                  onChange={handleImage}
                  className="w-full px-4 py-3 bg-black/30 border border-cyan-500/30 rounded-lg text-gray-300 file:mr-4 file:py-2 file:px-4 file:rounded-lg file:border-0 file:bg-cyan-500/20 file:text-cyan-400 hover:file:bg-cyan-500/30 transition-all"
                />
                {preview && (
                  <img
                    src={preview}
                    alt="preview"
                    className="w-32 h-32 mt-4 rounded-lg border-2 border-cyan-500/50 object-cover shadow-lg"
                  />
                )}
              </div>

              {/* Location */}
              <div>
                <button
                  type="button"
                  onClick={fetchLocation}
                  disabled={loadingLoc}
                  className="w-full px-4 py-3 bg-gradient-to-r from-green-500 to-emerald-500 text-white font-medium rounded-lg hover:shadow-lg hover:shadow-green-500/30 transition-all disabled:opacity-50 flex items-center justify-center gap-2"
                >
                  <MapPin size={18} />
                  {loadingLoc ? "Fetching Location..." : location ? "Location Captured ✓" : "Capture GPS Location"}
                </button>
                {location && (
                  <p className="text-green-400 text-sm mt-2 flex items-center gap-2">
                    <MapPin size={14} />
                    Lat: {location.lat.toFixed(6)}, Lng: {location.lng.toFixed(6)}
                  </p>
                )}
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSendingQuery}
                className="w-full px-4 py-4 bg-gradient-to-r from-cyan-500 to-blue-500 text-white font-bold text-lg rounded-lg hover:shadow-lg hover:shadow-cyan-500/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
              >
                {isSendingQuery ? (
                  <>
                    <Loader2 className="animate-spin" size={20} />
                    Submitting...
                  </>
                ) : (
                  <>
                    <Send size={20} />
                    Submit Ticket
                  </>
                )}
              </button>
            </form>
          </div>
        </div>

        {/* Past Queries Section */}
        <div className="mt-6 bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          <h2 className="text-2xl font-bold text-cyan-400 mb-6 flex items-center gap-2">
            <Clock size={28} />
            Your Past Queries
          </h2>
          
          {isFetchingQuery ? (
            <div className="flex justify-center items-center py-12">
              <Loader2 className="animate-spin text-cyan-400" size={40} />
            </div>
          ) : userQuery && userQuery.length > 0 ? (
            <div className="space-y-3">
              {userQuery.map((query) => (
                <Link key={query._id} to={`/user/${query._id}`}>
                  <div className="bg-gradient-to-r from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-4 hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-[1.02] group">
                    <div className="flex items-center justify-between">
                      <div className="flex-1">
                        <p className="text-white font-medium mb-1 line-clamp-1">{query.query || query.message}</p>
                        <div className="flex items-center gap-3 text-xs text-gray-400">
                          <span className="px-2 py-1 bg-cyan-500/20 text-cyan-400 rounded-full">
                            {query.issueType || query.queryType}
                          </span>
                          <span>{query.createdAt ? new Date(query.createdAt).toLocaleDateString() : "Recent"}</span>
                        </div>
                      </div>
                      <MessageSquare className="text-cyan-400 opacity-0 group-hover:opacity-100 transition-opacity" size={20} />
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          ) : (
            <div className="text-center py-12">
              <MessageSquare className="mx-auto text-gray-600 mb-4" size={48} />
              <p className="text-gray-400">No queries submitted yet</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default UserQuery;