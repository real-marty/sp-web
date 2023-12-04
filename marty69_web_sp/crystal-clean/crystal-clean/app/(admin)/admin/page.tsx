import { authOptions } from "@/app/api/auth/[...nextauth]/options";
import AdminSearch from "@/components/admin/a-search-bar";
import { UserImage } from "@/components/admin/a-image";
import { getServerSession } from "next-auth/next";

export default async function Main() {
  // fetching the user
  const session = await getServerSession(authOptions);
  const user = session?.user;
  const role = session?.user.role;

  return (
    <div>
      <AdminSearch />
      <main>
        {/* Settings forms */}
        <div className="divide-y divide-white/5">
          <div className="max-w-7xl grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Crystal Clean <span className="text-red-700">Admin Panel</span>
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                Systém pro správu dat a uživatelů.
              </p>
            </div>
          </div>

          <div className="grid max-w-full grid-cols-1 gap-x-8 gap-y-10 px-4 py-16 sm:px-6 md:grid-cols-3 lg:px-8">
            <div>
              <h2 className="text-base font-semibold leading-7 text-white">
                Vaše role je: <span className="text-red-700">{role}</span>
              </h2>
              <p className="mt-1 text-sm leading-6 text-zinc-400">
                Máte přístup k následujícím funkcím:
                <br />
                {role === "SUPER_ADMIN" && (
                  <>
                    {" "}
                    <span className="text-red-700">Správa všech uživatelů</span>
                    <br />
                    <span className="text-red-700">
                      Správa produktů (služeb)
                    </span>
                    <br />
                    <span className="text-red-700">Změna podřadných rolí</span>
                  </>
                )}
                {role === "ADMIN" && (
                  <>
                    {" "}
                    <span className="text-red-700">
                      Správa Moderátorů a uživatelů
                    </span>
                    <br />
                    <span className="text-red-700">
                      Správa produktů (služeb)
                    </span>
                    <br />
                    <span className="text-red-700">Změna podřadných rolí</span>
                  </>
                )}
                {role === "MODERATOR" && (
                  <>
                    {" "}
                    <br />
                    <span className="text-red-700">Správa produktů</span>
                  </>
                )}
              </p>
            </div>

            <form className="md:col-span-4">
              <div className="grid grid-cols-1 gap-x-6 gap-y-8 sm:max-w-xl sm:grid-cols-6">
                <div className="col-span-full">
                  <h3 className="block text-sm font-medium leading-6 text-white">
                    Jméno: <span className="text-red-700">{user?.name}</span>
                  </h3>
                </div>

                <div className="col-span-full">
                  <label className="block text-sm font-medium leading-6 text-white">
                    Email: <span className="text-red-700">{user?.email}</span>
                  </label>
                </div>

                <div className="col-span-full">
                  <div className="col-span-full flex items-center gap-x-8">
                    <UserImage
                      alt="User's profile image"
                      src={user?.image as string}
                      className="h-24 w-24 flex-none rounded-lg bg-gray-800 object-cover"
                    />
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </main>
    </div>
  );
}
