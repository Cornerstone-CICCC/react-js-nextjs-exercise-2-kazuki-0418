import Modal from "@/components/Modal";
import Link from "next/link";
import { notFound } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
}

async function getUser(id: string): Promise<User> {
  const res = await fetch(`https://dummyjson.com/users/${id}`, {
    cache: "no-store",
  });

  if (!res.ok) {
    notFound();
  }

  return res.json();
}

export default async function UserModal({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const user = await getUser(id);

  return (
    <Modal>
      <div className="bg-white rounded-lg shadow-xl max-w-md w-full mx-4 relative">
        {/* Close button */}
        <Link
          href="/users"
          className="absolute top-4 right-4 text-gray-400 hover:text-gray-600 transition-colors duration-200"
        >
          <svg
            className="w-6 h-6"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M6 18L18 6M6 6l12 12"
            />
          </svg>
        </Link>

        {/* Modal content */}
        <div className="p-6">
          <div className="text-center">
            <div className="mx-auto flex items-center justify-center h-16 w-16 rounded-full bg-blue-100 mb-4">
              <span className="text-2xl font-bold text-blue-600">
                {user.firstName.charAt(0)}
                {user.lastName.charAt(0)}
              </span>
            </div>

            <h2 className="text-2xl font-bold text-gray-900 mb-2">
              {user.firstName} {user.lastName}
            </h2>

            <p className="text-sm text-gray-500 mb-6">User ID: {user.id}</p>

            <div className="space-y-4">
              <div className="bg-gray-50 p-4 rounded-lg">
                <div className="grid grid-cols-2 gap-4 text-left">
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      First Name
                    </span>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.firstName}
                    </p>
                  </div>
                  <div>
                    <span className="text-xs font-medium text-gray-500 uppercase tracking-wide">
                      Last Name
                    </span>
                    <p className="text-lg font-semibold text-gray-900">
                      {user.lastName}
                    </p>
                  </div>
                </div>
              </div>

              <div className="flex space-x-3">
                <Link
                  href="/users"
                  className="flex-1 bg-gray-600 text-white px-4 py-2 rounded-md hover:bg-gray-700 transition-colors duration-200 text-center"
                >
                  Close
                </Link>
                <Link
                  href={`/users/${user.id}`}
                  className="flex-1 bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors duration-200 text-center"
                >
                  View Details
                </Link>
              </div>
            </div>
          </div>
        </div>
      </div>
    </Modal>
  );
}
