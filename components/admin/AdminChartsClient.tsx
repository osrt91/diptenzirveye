"use client";

import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  AreaChart,
  Area,
  PieChart,
  Pie,
  Cell,
  Legend,
} from "recharts";
import { motion } from "framer-motion";

interface AdminChartsProps {
  dailySignups: { date: string; count: number }[];
  xpDistribution: { level: string; users: number }[];
  weeklyActiveUsers: { week: string; active: number }[];
  topBooks: { name: string; readers: number }[];
}

const BAR_COLORS = ["#f97316", "#f59e0b", "#22c55e", "#8b5cf6", "#ec4899"];

interface TooltipPayloadItem { name: string; value: number; color: string }

function CustomTooltip({ active, payload, label }: { active?: boolean; payload?: TooltipPayloadItem[]; label?: string }) {
  if (!active || !payload?.length) return null;
  return (
    <div className="rounded-xl bg-dz-black/90 text-white px-4 py-3 shadow-xl text-xs">
      <p className="font-bold mb-1">{label}</p>
      {payload.map((item, i) => (
        <p key={i} style={{ color: item.color }}>
          {item.name}: {item.value}
        </p>
      ))}
    </div>
  );
}

const chartCardClass =
  "rounded-2xl border border-dz-grey-200 dark:border-dz-grey-800 bg-dz-white dark:bg-dz-grey-900 p-6";
const titleClass =
  "font-display text-sm font-bold text-dz-black dark:text-dz-white mb-4";

export default function AdminChartsClient({
  dailySignups,
  xpDistribution,
  weeklyActiveUsers,
  topBooks,
}: AdminChartsProps) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <motion.div
        className={chartCardClass}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0 }}
      >
        <h3 className={titleClass}>Günlük Kayıtlar</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={dailySignups}>
            <defs>
              <linearGradient id="signupFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#f97316" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e2da" />
            <XAxis
              dataKey="date"
              tick={{ fill: "#6b6560", fontSize: 11 }}
            />
            <YAxis
              tick={{ fill: "#6b6560", fontSize: 11 }}
              label={{
                value: "Kullanıcı",
                angle: -90,
                position: "insideLeft",
                style: { fill: "#6b6560", fontSize: 11 },
              }}
            />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="count"
              name="Kayıt"
              stroke="#f97316"
              fill="url(#signupFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className={chartCardClass}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.1 }}
      >
        <h3 className={titleClass}>XP Seviye Dağılımı</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={xpDistribution}>
            <defs>
              <linearGradient id="xpBarGrad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#f97316" />
                <stop offset="100%" stopColor="#f59e0b" />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e2da" />
            <XAxis
              dataKey="level"
              tick={{ fill: "#6b6560", fontSize: 11 }}
            />
            <YAxis tick={{ fill: "#6b6560", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Bar
              dataKey="users"
              name="Kullanıcı"
              fill="url(#xpBarGrad)"
              radius={[6, 6, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className={chartCardClass}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.2 }}
      >
        <h3 className={titleClass}>Haftalık Aktif Kullanıcı</h3>
        <ResponsiveContainer width="100%" height={250}>
          <AreaChart data={weeklyActiveUsers}>
            <defs>
              <linearGradient id="wauFill" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#22c55e" stopOpacity={0.2} />
                <stop offset="100%" stopColor="#22c55e" stopOpacity={0} />
              </linearGradient>
            </defs>
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e2da" />
            <XAxis
              dataKey="week"
              tick={{ fill: "#6b6560", fontSize: 11 }}
            />
            <YAxis tick={{ fill: "#6b6560", fontSize: 11 }} />
            <Tooltip content={<CustomTooltip />} />
            <Area
              type="monotone"
              dataKey="active"
              name="Aktif"
              stroke="#22c55e"
              fill="url(#wauFill)"
              strokeWidth={2}
            />
          </AreaChart>
        </ResponsiveContainer>
      </motion.div>

      <motion.div
        className={chartCardClass}
        initial={{ opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.3 }}
      >
        <h3 className={titleClass}>Popüler Kitaplar</h3>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={topBooks} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#e8e2da" />
            <XAxis
              type="number"
              tick={{ fill: "#6b6560", fontSize: 11 }}
            />
            <YAxis
              type="category"
              dataKey="name"
              tick={{ fill: "#6b6560", fontSize: 11 }}
              width={100}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="readers" name="Okuyucu" radius={[0, 6, 6, 0]}>
              {topBooks.map((_, i) => (
                <Cell
                  key={i}
                  fill={BAR_COLORS[i % BAR_COLORS.length]}
                />
              ))}
            </Bar>
          </BarChart>
        </ResponsiveContainer>
      </motion.div>
    </div>
  );
}
