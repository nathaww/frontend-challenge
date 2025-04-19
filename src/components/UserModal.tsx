import { useQuery } from "@tanstack/react-query";
import { getUser } from "../api";
import { User } from "../types/user";

interface UserModalProps {
  userId: number | null;
  onClose: () => void;
}

export default function UserModal({ userId, onClose }: UserModalProps) {
  const { data, isLoading } = useQuery<{ data: User }>({
    queryKey: ['user', userId],
    queryFn: () => getUser(userId!),
    enabled: !!userId,
  });

  if (!userId) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 backdrop-blur-sm">
      <div className="bg-[var(--surface)] rounded-[var(--radius-lg)] p-6 max-w-md w-full shadow-lg border border-[var(--card-border)]">
        {isLoading ? (
          <div className="flex justify-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[var(--primary)]"></div>
          </div>
        ) : data ? (
          <div className="space-y-4">
            <div className="flex items-center gap-4">
              <img 
                src={data.data.avatar} 
                alt={`${data.data.first_name} ${data.data.last_name}`}
                className="w-20 h-20 rounded-[var(--radius-full)]" 
              />
              <div>
                <h2 className="text-xl font-bold text-[var(--text)]">
                  {data.data.first_name} {data.data.last_name}
                </h2>
                <p className="text-[var(--text-secondary)]">{data.data.email}</p>
              </div>
            </div>
            <div className="pt-4 flex justify-end">
              <button 
                onClick={onClose}
                className="btn btn-primary"
              >
                Close
              </button>
            </div>
          </div>
        ) : null}
      </div>
    </div>
  );
}