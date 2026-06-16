import React from "react";

const DashboardStatCard = ({ stats }) => {
  return (
    <div className=" grid grid-cols-1 gap-4 md:grid-cols-3 xl:grid-cols-4 ">
      {stats.map((item) => {
        const Icon = item.icon;

        return (
          <div
            key={item.id}
            className="bg-[#18181b] border w-full border-[#27272a] rounded-xl p-5  flex flex-col justify-between transition-all duration-200 hover:border-zinc-700"
          >
            <div className="w-fit rounded-lg bg-[#27272a] p-2">
              <Icon className="size-5 text-zinc-300" />
            </div>

            <div className="space-y-1">
              <p className="text-xs text-zinc-400">{item.title}</p>

              <h2 className="text-3xl font-semibold text-white">
                {typeof item.value === "number"
                  ? item.value.toLocaleString()
                  : item.value}
              </h2>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default DashboardStatCard;