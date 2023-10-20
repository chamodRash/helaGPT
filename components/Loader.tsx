import { Triangle } from "react-loader-spinner";

export const Loader = () => {
  return (
    <div className="h-full gap-y-4 gap-x-5 flex items-center justify-center">
      <div className="w-10 h-full">
        <Triangle color="white" ariaLabel="triangle-loading" visible={true} />
      </div>
      <p className="text-zinc-200 text-center text-sm tracking-wider">
        helaGPT is Proccessing...
      </p>
    </div>
  );
};
