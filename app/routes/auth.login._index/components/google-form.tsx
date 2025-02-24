import { FcGoogle } from 'react-icons/fc';
import { Form } from 'react-router';

export const GoogleForm = () => {
  return (
    <Form method="post" className="my-4">
      <button
        type="submit"
        name="_action"
        value="Sign In Google"
        className="mt-2 w-full rounded-xl border border-gray-600 bg-white px-3 py-2 font-semibold text-white transition duration-300 ease-in-out hover:bg-gray-200"
      >
        <div className="flex justify-center">
          <FcGoogle size={22} className="mr-2" />
          <span className="text-gray-700">Sign in with Google</span>
        </div>
      </button>
    </Form>
  );
};
