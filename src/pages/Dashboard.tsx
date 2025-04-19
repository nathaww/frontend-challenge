import { useQuery } from "@tanstack/react-query";
import { getUsers } from "../api";
import { UsersResponse } from "../types/user";
import { useState } from "react";
import UserModal from "../components/UserModal";

const UserCard = ({ 
  first_name, 
  last_name, 
  email, 
  avatar,
  onClick 
}: { 
  first_name: string;
  last_name: string;
  email: string;
  avatar: string;
  onClick: () => void;
}) => (
  <div 
    onClick={onClick}
    className="card p-4 hover:shadow-lg cursor-pointer transition-all"
  >
    <div className="flex items-center space-x-4">
      <img 
        src={avatar} 
        alt={`${first_name} ${last_name}`} 
        className="w-16 h-16 rounded-[var(--radius-full)]"
      />
      <div>
        <h3 className="font-semibold text-lg text-[var(--text)]">{first_name} {last_name}</h3>
        <p className="text-sm text-[var(--text-secondary)]">{email}</p>
      </div>
    </div>
  </div>
);

export default function Dashboard() {
  const [page, setPage] = useState(1);
  const [selectedUserId, setSelectedUserId] = useState<number | null>(null);
  const { data, isLoading, error } = useQuery<UsersResponse>({
    queryKey: ['users', page],
    queryFn: () => getUsers(page),
  });

  const handleUserClick = (userId: number) => {
    setSelectedUserId(userId);
  };

  if (isLoading) {
    return (
      <div className="flex justify-center items-center min-h-screen bg-[var(--background)]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center text-[var(--error)] p-4">
        Error loading users. Please try again.
      </div>
    );
  }

  if (!data) return null;

  return (
    <div className="container mx-auto px-4 py-18 min-h-screen bg-[var(--background)]">
      <div className="flex justify-between items-center mb-8">
        <h1 className="text-3xl font-bold text-[var(--text)]">Till's SaaS Team</h1>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
        {data.data.map((user) => (
          <UserCard
            key={user.id}
            {...user}
            onClick={() => handleUserClick(user.id)}
          />
        ))}
      </div>

      <div className="flex justify-center gap-2">
        <button
          onClick={() => setPage(p => Math.max(1, p - 1))}
          disabled={page === 1}
          className="btn btn-primary disabled:opacity-50"
        >
          Previous
        </button>
        <span className="px-4 py-2 text-[var(--text)]">
          Page {page} of {data.total_pages}
        </span>
        <button
          onClick={() => setPage(p => Math.min(data.total_pages, p + 1))}
          disabled={page === data.total_pages}
          className="btn btn-primary disabled:opacity-50"
        >
          Next
        </button>
      </div>

      <UserModal 
        userId={selectedUserId} 
        onClose={() => setSelectedUserId(null)} 
      />
    </div>
  );
}