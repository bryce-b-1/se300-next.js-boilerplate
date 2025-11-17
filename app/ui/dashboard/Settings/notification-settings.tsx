export default function NotificationSettings(){
    return(
    <>
        <h2 className="text-lg font-medium">Notifications</h2>
                <p className="mt-1 text-sm text-gray-500">
                Choose which updates you want to receive.
                </p>

                <form className="mt-4 space-y-3 text-sm">

                <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>
                    <span className="font-medium">Security alerts</span>
                    <br />
                    <span className="text-gray-500">
                        Important notifications about your account.
                    </span>
                    </span>
                </label>

                <label className="flex items-start gap-2">
                    <input type="checkbox" className="mt-1" />
                    <span>
                    <span className="font-medium">Group Alerts</span>
                    <br />
                    <span className="text-gray-500">
                        Important notifications about groups you are in.
                    </span>
                    </span>
                </label>

                <button
                    type="submit"
                    className="mt-3 inline-flex items-center justify-center rounded-md bg-sky-600 px-4 py-2 text-sm font-medium text-white hover:bg-sky-700"
                >
                    Save notification settings
                </button>
                </form>
        </>
    )
}