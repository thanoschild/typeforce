import React from 'react'
import { Test } from "@prisma/client";

type UserTestProps = {
  data: Test[];
};


export default function UserTestTable({data}: UserTestProps) {
    const formatDate = (date: Date) => {
    return date.toLocaleDateString('en-US', {
      month: 'long',
      day: 'numeric',
      year: 'numeric'
    });
  };

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="text-left text-theme-sub">
            <th className="py-3 px-4">WPM</th>
            <th className="py-3 px-4">Accuracy</th>
            <th className="py-3 px-4 text-right">Time</th>
            <th className="py-3 px-4 text-right">Mode</th>
            <th className="py-3 px-4 text-right">Date</th>
          </tr>
        </thead>
        <tbody>
          {data.length > 0 ? (
            data.map((entry, index) => (
              <tr
                key={entry.id}
                className={`text-theme-text ${
                  index % 2 === 1 ? "bg-theme-sub-alt" : ""
                }`}
              >
                <td className="py-4 px-4 first:rounded-l-lg">
                  {entry.wpm.toFixed(2)}
                </td>
                <td className="py-4 px-4">
                  {entry.accuracy.toFixed(2)}%
                </td>
                <td className="py-4 px-4 text-right">
                  {entry.time}s
                </td>
                <td className="py-4 px-4 text-right">
                    {`${entry.modeOption} ${entry.mode.charAt(0).toUpperCase() + entry.mode.slice(1)}`}
                </td>
                <td className="py-4 px-4 text-right last:rounded-r-lg">
                  {formatDate(entry.createdAt)}
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td 
                colSpan={5} 
                className="text-center py-8 text-theme-sub bg-theme-sub-alt first:rounded-l-lg last:rounded-r-lg"
              >
                No results found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  )
}