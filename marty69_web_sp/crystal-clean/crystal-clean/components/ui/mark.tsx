"use client";

import { CheckBadgeIcon, XCircleIcon } from "@heroicons/react/24/outline";

type MarkProps = {
  type: boolean;
};

const Mark = ({ type }: MarkProps) => {
  if (type === true) {
    return (
      <div className="flex items-center pl-5">
        <CheckBadgeIcon className="h-5 w-5 text-green-700" />
      </div>
    );
  } else {
    return (
      <div className="flex items-center pl-5">
        <XCircleIcon className="h-5 w-5 text-red-700" />
      </div>
    );
  }
};

export default Mark;
