export default function AccountSettings(){


    return(
        <><h2 className="text-lg font-medium">Account</h2>
        <p className="mt-1 text-sm text-gray-500">
          Update security and sign-in preferences.
        </p>

        <div className="mt-4 space-y-4">
          <button className="inline-flex items-center rounded-md border border-gray-300 px-4 py-2 text-sm font-medium hover:bg-gray-50">
            Change password
          </button>
        </div>
        </>
    )
}