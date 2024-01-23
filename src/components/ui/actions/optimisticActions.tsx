import { RefObject } from "react";

type dataProps = {
  id: number;
  content: string | null;
  authorId: number | null;
};

export async function formActionTest(
  formData: FormData,
  addOptimistic: (action: dataProps) => void,
  action: (formData: FormData) => Promise<void>,
  formRef: RefObject<HTMLFormElement>
) {
  addOptimistic({
    id: 1,
    content: formData.get("input") as string,
    authorId: null,
  });
  formRef.current?.reset();
  await action(formData);
}
