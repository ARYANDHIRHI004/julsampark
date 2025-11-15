import React, { useEffect } from 'react';
import useOperatorsStore from '../stores/useOPeratorsStore';
import { Loader2, User, Mail, Phone, UserCog } from 'lucide-react';

const PumpControllers = () => {
  const { operators, isFetchingAllOperators, getAllOperators } = useOperatorsStore();

  useEffect(() => {
    getAllOperators();
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0e27] p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold bg-gradient-to-r from-cyan-400 to-blue-400 bg-clip-text text-transparent flex items-center gap-3">
            <UserCog className="text-cyan-400" size={36} />
            Pump Operators
          </h1>
          <p className="text-gray-400 mt-2">Manage field operators and assignments</p>
        </div>

        {/* Operators List */}
        <div className="bg-gradient-to-br from-[#1a1f3a] to-[#0f1729] rounded-2xl shadow-2xl p-6 border border-cyan-500/20">
          {isFetchingAllOperators ? (
            <div className="flex justify-center items-center py-20">
              <Loader2 className="animate-spin text-cyan-400" size={48} />
            </div>
          ) : operators && operators.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {operators.map((operator) => (
                <div
                  key={operator._id}
                  className="bg-gradient-to-br from-cyan-500/10 to-blue-500/10 border border-cyan-500/30 rounded-xl p-6 hover:shadow-lg hover:shadow-cyan-500/20 transition-all hover:scale-105"
                >
                  <div className="flex items-center gap-4 mb-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-cyan-500 to-blue-500 rounded-full flex items-center justify-center">
                      <User className="text-white" size={24} />
                    </div>
                    <div className="flex-1">
                      <h3 className="text-white font-bold text-lg">{operator.name}</h3>
                      <span className="text-xs text-cyan-400 bg-cyan-500/20 px-2 py-1 rounded-full">
                        Active
                      </span>
                    </div>
                  </div>
                  
                  <div className="space-y-2">
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Mail className="text-cyan-400" size={16} />
                      {operator.email}
                    </div>
                    <div className="flex items-center gap-2 text-gray-300 text-sm">
                      <Phone className="text-cyan-400" size={16} />
                      {operator.phone}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-20">
              <UserCog className="mx-auto text-gray-600 mb-4" size={64} />
              <p className="text-gray-400 text-lg">No operators found</p>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default PumpControllers;