import { SmileyNervous } from '@phosphor-icons/react';

function WorkInProgress() {
  return (
    <div className="flex flex-col my-16 gap-4 justify-center items-center">
      <SmileyNervous size="256" />
      <h1 className="text-2xl md:text-8xl text-center">
        Desculpe-nos<i>!</i>
      </h1>
      <p className="text-sm md:text-2xl text-center">
        Parece que esta página não foi implementada ainda
      </p>
    </div>
  );
}

export default WorkInProgress;
