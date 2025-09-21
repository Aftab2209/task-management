"use client"

import type React from "react"
import { Card, CardContent } from "../ui/Card"
import type { TaskStats } from "../../types"

interface StatsCardsProps {
  stats: TaskStats | null
  isLoading: boolean
}

export const StatsCards: React.FC<StatsCardsProps> = ({ stats, isLoading }) => {
  const statCards = [
    {
      title: "Total Tasks",
      value: stats?.total ?? 0,
      icon: (
        <svg className="w-6 h-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M9 5H7a2 2 0 00-2 2v10a2 2 0 002 2h8a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2"
          />
        </svg>
      ),
      bgColor: "bg-yellow-50",
      cardColor: "bg-blue-200"
    },
    {
      title: "Completed",
      value: stats?.completed ?? 0,
      icon: (
        <svg className="w-6 h-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
        </svg>
      ),
      bgColor: "bg-yellow-50",
      cardColor: "bg-green-200"

    },
    {
      title: "In Progress",
      value: stats?.inProgress ?? 0,
      icon: (
        <svg className="w-6 h-6 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
          />
        </svg>
      ),
      bgColor: "bg-yellow-50",
      cardColor: "bg-yellow-200"

    },
    {
      title: "Overdue",
      value: stats?.overdue ?? 0,
      icon: (
        <svg className="w-6 h-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z"
          />
        </svg>
      ),
      bgColor: "bg-yellow-50",
      cardColor: "bg-red-200"


    },
  ]

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat) => (
        <Card key={stat.title} className={`${stat.cardColor} rounded rounded-3xl`}>
          <CardContent className="p-2">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                {isLoading || !stats ? (
                  <div className="flex items-center h-9">
                    <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-gray-900"></div>
                  </div>
                ) : (
                  <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
                )}
              </div>
              <div className={`p-3 rounded-full ${stat.bgColor}`}>{stat.icon}</div>
            </div>
          </CardContent>
        </Card>
      ))}
    </div>
  )
}