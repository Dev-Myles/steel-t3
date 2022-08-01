import { zodResolver } from '@hookform/resolvers/zod';
import { useForm } from 'react-hook-form';
import * as z from 'zod';
import regexSP from '../../../utils/regex/regex-strings';

export interface ICreateUser {}

const schema = z.object({
  firstName: z.string().min(2).max(30),
  lastName: z.string().min(2).max(30),
  email: z.string().email().max(50),
  password: z.string().min(8).max(30),
  confirmPassword: z.string(),
});

const CreateUser: React.FC<ICreateUser> = () => {
  const {
    register,
    watch,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(schema),
  });

  const checkPassword: Boolean = watch('password') === watch('confirmPassword');

  function fieldCheck(input: string, reg: RegExp): Boolean {
    const hasTyped: Boolean = watch(`${input}`)?.length === 0;
    const search: Boolean = hasTyped ? false : watch(`${input}`)?.search(reg);
    return search;
  }

  return (
    <div className="grid place-items-center h-screen">
      <div className="bg-white p-10 w-1/4 rounded-lg drop-shadow-lg mx-auto text-center">
        <h1 className="align-middle text-3xl">Create Account</h1>
        <form
          onSubmit={handleSubmit((d) => console.log(d))}
          className="flex flex-col text-left "
        >
          <label className="flex flex-col mb-1">
            First Name
            <input type="text" {...register('firstName')} />
            {!fieldCheck('firstName', regexSP.name) ? (
              <span className="text-gray-400 text-center">2-30 letters</span>
            ) : (
              <span className="text-red-400">2-30 letters</span>
            )}
          </label>

          <label className="flex flex-col mb-1">
            Last Name
            <input type="text" {...register('lastName')} />
            {!fieldCheck('lastName', regexSP.name) ? (
              <span className="text-gray-400 text-center">2-30 letters</span>
            ) : (
              <span className="text-red-400">2-30 letters</span>
            )}
          </label>

          <label className="flex flex-col mb-1">
            Email
            <input type="email" {...register('email')} />
            {!fieldCheck('email', regexSP.email) ? (
              <span className="text-gray-400 text-center">
                must include @ and .com
              </span>
            ) : (
              <span className="text-red-400">Not a valid email</span>
            )}
          </label>

          <label className="flex flex-col mb-1">
            Password
            <input type="password" {...register('password')} />
            {!fieldCheck('password', regexSP.password) ? (
              <span className="text-gray-400 text-center">
                min 6-30 characters, 1 number, 1 special character
              </span>
            ) : (
              <span className="text-red-400">
                min 6-30 characters, 1 number, 1 special character
              </span>
            )}
          </label>

          <label className="flex flex-col mb-1">
            Confirm Password
            <input type="password" {...register('confirmPassword')} />
            {checkPassword ? (
              <span className="text-gray-400 text-center">
                must match password
              </span>
            ) : (
              <span className="text-red-400">passwords do not match</span>
            )}
          </label>

          <input
            type="submit"
            value="Register Account"
            className="rounded-full mt-5 p-2 bg-cyan-600 text-white text-2xl hover:bg-cyan-700 drop-shadow-lg 
            hover: cursor-pointer transition ease-in-out"
          />
        </form>
      </div>
    </div>
  );
};

export default CreateUser;
