import { useCreateNotiMutation } from "../../RTKQuery/Slides/slide";
import { createNoti } from "../../RTKQuery/Slides/types";

const [handleCreateNoti] = useCreateNotiMutation();

export const myFunctionNoti = async (data: createNoti) => {
    await handleCreateNoti({ param: data }).unwrap();
};
