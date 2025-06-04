import Link from "next/link";
import { notFound } from "next/navigation";

interface User {
  id: number;
  firstName: string;
  lastName: string;
  age: number;
  gender: string;
  email: string;
  phone: string;
  image: string;
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

export default async function UserDetailPage({
  params,
}: {
  params: { id: string };
}) {
  const user = await getUser(params.id);

  return (
    <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
      <div className="mb-6">
        <Link
          href="/users"
          className="inline-flex items-center text-blue-600 hover:text-blue-800 transition-colors duration-200"
        >
          <svg
            className="w-4 h-4 mr-2"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M15 19l-7-7 7-7"
            />
          </svg>
          Back to Users
        </Link>
      </div>

      <div className="bg-white shadow-xl rounded-lg overflow-hidden">
        <div className="px-6 py-8 sm:px-8">
          <div className="flex items-center space-x-6">
            <div className="flex-shrink-0">
              <img
                className="h-24 w-24 rounded-full object-cover border-4 border-gray-200"
                src={user.image}
                alt={`${user.firstName} ${user.lastName}`}
              />
            </div>
            <div>
              <h1 className="text-3xl font-bold text-gray-900">
                {user.firstName} {user.lastName}
              </h1>
              <p className="text-lg text-gray-600 mt-1">User ID: {user.id}</p>
            </div>
          </div>

          <div className="mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="bg-gray-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Personal Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    First Name:
                  </span>
                  <p className="text-lg text-gray-900">{user.firstName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Last Name:
                  </span>
                  <p className="text-lg text-gray-900">{user.lastName}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Age:
                  </span>
                  <p className="text-lg text-gray-900">{user.age} years old</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Gender:
                  </span>
                  <p className="text-lg text-gray-900 capitalize">
                    {user.gender}
                  </p>
                </div>
              </div>
            </div>

            <div className="bg-blue-50 p-6 rounded-lg">
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                Contact Information
              </h2>
              <div className="space-y-3">
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Email:
                  </span>
                  <p className="text-lg text-blue-600">{user.email}</p>
                </div>
                <div>
                  <span className="text-sm font-medium text-gray-500">
                    Phone:
                  </span>
                  <p className="text-lg text-gray-900">{user.phone}</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
