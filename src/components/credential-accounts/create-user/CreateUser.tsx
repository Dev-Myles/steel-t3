// import { zodResolver } from '@hookform/resolvers/zod';
// import { useRouter } from 'next/router';
// import { BaseSyntheticEvent } from 'react';
// import { useForm } from 'react-hook-form';
// import {
//   CreateUserSchema,
//   createUserSchema,
// } from '../../../schema/user-schema';
// import { trpc } from '../../../utils/trpc';

// export interface ICreateUser {}

// const CreateUser: React.FC<ICreateUser> = () => {
//   const {
//     register,
//     watch,
//     handleSubmit,
//     formState: { errors },
//   } = useForm<CreateUserSchema>({
//     resolver: zodResolver(createUserSchema),
//   });
//   const router = useRouter();
//   const checkPassword: Boolean = watch('password') === watch('confirmPassword');

//   //dynamic error function for users when filling out form, not working because of
//   //readonly typing. Future fix maybe.
//   // function fieldCheck(input: String, reg: RegExp): Boolean {
//   //   const data = input;
//   //   const hasTyped: Boolean = watch(`${data}`)?.length === 0;
//   //   const search: Boolean = hasTyped ? false : watch(`${input}`)?.search(reg);
//   //   return search;
//   // }

//   const { mutate, error } = trpc.useMutation(['user.create-account'], {
//     onError: (error) => {
//       console.log(error);
//     },
//     onSuccess: () => {
//       router.push('/registered');
//     },
//   });

//   function onSubmit(values: CreateUserSchema, e?: BaseSyntheticEvent) {
//     const { password, confirmPassword } = values;
//     if (password === confirmPassword) {
//       mutate(values);
//     }
//   }

//   const inputErrorStyle: string = 'focus:ring-red-400 focus:border-red-400';

//   return (
//     <div className="grid place-items-center h-screen">
//       <div className="bg-white p-10 w-full lg:w-1/4 rounded-lg drop-shadow-lg mx-auto text-center">
//         <h1 className="align-middle text-3xl">Create Account</h1>
//         <form
//           onSubmit={handleSubmit(onSubmit)}
//           className="flex flex-col text-left "
//         >
//           {error && error.message ? (
//             <span className="text-gray-400 text-center">{error.message}</span>
//           ) : null}
//           <label className="flex flex-col mb-1">
//             First Name
//             <input
//               className={errors?.firstName ? inputErrorStyle : ''}
//               type="text"
//               {...register('firstName')}
//             />
//             {errors?.firstName ? (
//               <span className="text-red-400">2-30 letters</span>
//             ) : (
//               <span className="text-gray-400 text-center">2-30 letters</span>
//             )}
//           </label>

//           <label className="flex flex-col mb-1">
//             Last Name
//             <input
//               className={errors?.lastName ? inputErrorStyle : ''}
//               type="text"
//               {...register('lastName')}
//             />
//             {errors?.lastName ? (
//               <span className="text-red-400">2-30 letters</span>
//             ) : (
//               <span className="text-gray-400 text-center">2-30 letters</span>
//             )}
//           </label>

//           <label className="flex flex-col mb-1">
//             Email
//             <input
//               className={errors?.email ? inputErrorStyle : ''}
//               type="email"
//               {...register('email')}
//             />
//             {errors?.email ? (
//               <span className="text-red-400">Not a valid email</span>
//             ) : (
//               <span className="text-gray-400 text-center">
//                 must include @ and .com
//               </span>
//             )}
//           </label>

//           <label className="flex flex-col mb-1">
//             Password
//             <input
//               className={errors?.password ? inputErrorStyle : ''}
//               type="password"
//               {...register('password')}
//             />
//             {errors?.password ? (
//               <span className="text-red-400">
//                 min 6-30 characters, 1 number, 1 special character
//               </span>
//             ) : (
//               <span className="text-gray-400 text-center">
//                 min 6-30 characters, 1 number, 1 special character
//               </span>
//             )}
//           </label>

//           <label className="flex flex-col mb-1">
//             Confirm Password
//             <input type="password" {...register('confirmPassword')} />
//             {checkPassword ? (
//               <span className="text-gray-400 text-center">
//                 must match password
//               </span>
//             ) : (
//               <span className="text-red-400">passwords do not match</span>
//             )}
//           </label>

//           <input
//             type="submit"
//             value="Register Account"
//             className="rounded-full mt-5 p-2 bg-cyan-600 text-white text-2xl hover:bg-cyan-700 drop-shadow-lg
//             hover: cursor-pointer transition ease-in-out"
//           />
//         </form>
//       </div>
//     </div>
//   );
// };

// export default CreateUser;

export {};
