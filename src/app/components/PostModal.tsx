import { useUpdatePostMutation } from "@/redux/features/post/postApi";
import { TPost } from "@/types/types";
import { Dialog, Transition } from "@headlessui/react";
import { Fragment, useState } from "react";
import { FieldValues, SubmitHandler, useForm } from "react-hook-form";
import { toast } from "sonner";

interface PostModalProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: TPost;
  setEditModes: (postId: string) => void;
}

const PostModal: React.FC<PostModalProps> = ({
  isOpen,
  setIsOpen,
  post,
  setEditModes,
}) => {
  const [inputValue, setInputValue] = useState("");
  const closeModal = () => {
    setIsOpen(false);
  };
  const [updatePost] = useUpdatePostMutation();

  const { register, handleSubmit } = useForm();

  const onSubmit = async (data: FieldValues) => {
    const res: any = await updatePost({
      postText: data.tweetText,
      postId: post._id,
    });
    if (res?.error) {
      toast.error(`Something went wrong`, {
        duration: 2000,
      });
    } else {
      toast.success("Post updated successfully!", {
        duration: 2000,
      });
      setIsOpen(false);
      setEditModes(post._id);
    }
  };

  return (
    <>
      <Transition appear show={isOpen} as={Fragment}>
        <Dialog as="div" className="relative z-10" onClose={closeModal}>
          <Transition.Child
            as={Fragment}
            enter="ease-out duration-300"
            enterFrom="opacity-0"
            enterTo="opacity-100"
            leave="ease-in duration-200"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <div className="fixed inset-0 bg-black bg-opacity-25" />
          </Transition.Child>

          <div className="fixed inset-0 overflow-y-auto">
            <div className="flex min-h-full items-center justify-center p-4 text-center">
              <Transition.Child
                as={Fragment}
                enter="ease-out duration-300"
                enterFrom="opacity-0 scale-95"
                enterTo="opacity-100 scale-100"
                leave="ease-in duration-200"
                leaveFrom="opacity-100 scale-100"
                leaveTo="opacity-0 scale-95"
              >
                <Dialog.Panel className="w-full max-w-md transform overflow-hidden rounded-2xl bg-slate-800 p-6 text-left align-middle shadow-xl transition-all">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-semibold leading-6 text-gray-100"
                  >
                    Edit your post
                  </Dialog.Title>
                  <form onSubmit={handleSubmit(onSubmit)}>
                    <div className="flex">
                      <div className="flex-1 px-2 pt-2 mt-2">
                        <textarea
                          {...register("tweetText")}
                          className=" bg-transparent text-gray-200 font-medium text-lg w-full outline-none"
                          rows={4}
                          cols={50}
                          placeholder="What's happening?"
                          defaultValue={post?.postText}
                          onChange={(e) => setInputValue(e.target.value)}
                        />
                      </div>
                    </div>
                    {/*middle creat tweet below icons*/}
                    <div className="flex">
                      <div className="w-10" />
                      <div className="flex-1">
                        {inputValue.trim() === "" ? (
                          <button
                            disabled
                            className="bg-blue-200 mt-2 hover:cursor-not-allowed text-gray-100 font-bold py-2 px-8 rounded-full mr-8 float-right"
                          >
                            Update Post
                          </button>
                        ) : (
                          <button className="bg-blue-400 mt-2 hover:bg-blue-600 text-white font-bold py-2 px-8 rounded-full mr-8 float-right hover:cursor-pointer">
                            Update Post
                          </button>
                        )}
                      </div>
                    </div>
                  </form>
                </Dialog.Panel>
              </Transition.Child>
            </div>
          </div>
        </Dialog>
      </Transition>
    </>
  );
};
export default PostModal;
