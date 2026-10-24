"use client";

import { useState } from "react";
import useSWR from "swr";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import {
  Inbox,
  CheckCircle,
  XCircle,
  Clock,
  Building2,
  Calendar,
  MessageSquare,
  ChevronLeft,
  X,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

interface Application {
  id: string;
  companyName: string;
  companyLogo?: string;
  message: string;
  status: "pending" | "accepted" | "rejected";
  createdAt: string;
}

export default function ApplicationsClient() {
  const { data, mutate, isLoading } = useSWR("/api/applications", fetcher);
  const [selectedApp, setSelectedApp] = useState<Application | null>(null);
  const [updating, setUpdating] = useState(false);
  const [activeTab, setActiveTab] = useState("all");

  const applications: Application[] = data?.applications || [];

  const filteredApps = applications.filter((app) => {
    if (activeTab === "all") return true;
    return app.status === activeTab;
  });

  const counts = {
    all: applications.length,
    pending: applications.filter((a) => a.status === "pending").length,
    accepted: applications.filter((a) => a.status === "accepted").length,
    rejected: applications.filter((a) => a.status === "rejected").length,
  };

  async function handleUpdateStatus(app: Application, status: "accepted" | "rejected") {
    setUpdating(true);
    try {
      const res = await fetch(`/api/applications/${app.id}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ status }),
      });
      if (res.ok) {
        mutate();
        setSelectedApp(null);
      }
    } catch (e) {
      console.error(e);
    } finally {
      setUpdating(false);
    }
  }

  const statusConfig = {
    pending: {
      icon: <Clock className="h-3.5 w-3.5" />,
      label: "در انتظار",
      color: "amber" as const,
    },
    accepted: {
      icon: <CheckCircle className="h-3.5 w-3.5" />,
      label: "پذیرفته",
      color: "lime" as const,
    },
    rejected: {
      icon: <XCircle className="h-3.5 w-3.5" />,
      label: "رد شده",
      color: "cherry" as const,
    },
  };

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-bg">
        <div className="h-12 w-12 animate-spin rounded-full border-4 border-violet border-t-transparent" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-bg pb-24">
      {/* هدر */}
      <div className="sticky top-0 z-10 border-b border-line bg-paper/95 px-4 py-4 backdrop-blur-md">
        <h1 className="mb-1 text-lg font-bold text-ink">پیشنهادها</h1>
        <p className="text-xs text-muted">
          پیشنهادهای دریافتی از شرکت‌ها را مدیریت کن
        </p>
      </div>

      <div className="px-4 pt-4">
        {/* تب‌ها */}
        <Tabs value={activeTab} onValueChange={setActiveTab}>
          <TabsList className="grid w-full grid-cols-4">
            <TabsTrigger value="all">
              همه ({counts.all})
            </TabsTrigger>
            <TabsTrigger value="pending">
              در انتظار ({counts.pending})
            </TabsTrigger>
            <TabsTrigger value="accepted">
              پذیرفته ({counts.accepted})
            </TabsTrigger>
            <TabsTrigger value="rejected">
              رد شده ({counts.rejected})
            </TabsTrigger>
          </TabsList>

          <TabsContent value={activeTab} className="mt-4">
            {filteredApps.length === 0 ? (
              <div className="rounded-xl2 border border-line bg-paper p-12 text-center">
                <div className="mb-4 text-6xl">📭</div>
                <h3 className="mb-2 text-lg font-bold text-ink">
                  هنوز پیشنهادی نداری
                </h3>
                <p className="text-sm text-muted">
                  پروفایلت رو کامل کن و در نقشه پیشرفت کن تا شرکت‌ها پیدات کنن.
                </p>
              </div>
            ) : (
              <div className="space-y-3">
                {filteredApps.map((app, index) => {
                  const config = statusConfig[app.status];
                  return (
                    <motion.button
                      key={app.id}
                      onClick={() => setSelectedApp(app)}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.05 }}
                      whileTap={{ scale: 0.98 }}
                      className="w-full rounded-xl2 border border-line bg-paper p-4 text-right transition-all hover:border-violet/30 hover:shadow-soft"
                    >
                      <div className="flex items-start gap-3">
                        {/* لوگو */}
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-xl bg-violet/10 text-violet">
                          {app.companyLogo ? (
                            <img
                              src={app.companyLogo}
                              alt={app.companyName}
                              className="h-full w-full rounded-xl object-cover"
                            />
                          ) : (
                            <Building2 className="h-5 w-5" />
                          )}
                        </div>

                        {/* محتوا */}
                        <div className="flex-1">
                          <div className="mb-1 flex items-center justify-between gap-2">
                            <h3 className="text-sm font-bold text-ink">
                              {app.companyName}
                            </h3>
                            <Badge variant={config.color}>
                              {config.icon}
                              <span className="mr-1">{config.label}</span>
                            </Badge>
                          </div>
                          <p className="mb-2 line-clamp-2 text-xs leading-5 text-muted">
                            {app.message}
                          </p>
                          <p className="flex items-center gap-1 text-[10px] text-muted">
                            <Calendar className="h-3 w-3" />
                            {new Date(app.createdAt).toLocaleDateString("fa-IR")}
                          </p>
                        </div>

                        <ChevronLeft className="mt-1 h-5 w-5 flex-shrink-0 text-muted" />
                      </div>
                    </motion.button>
                  );
                })}
              </div>
            )}
          </TabsContent>
        </Tabs>

        {/* پیام انگیزشی */}
        <div className="mt-6 rounded-xl2 bg-gradient-to-l from-violet to-violet-soft p-5 text-white">
          <p className="mb-1 text-xs opacity-80">هر پیشنهاد = یک فرصت</p>
          <p className="text-sm font-medium leading-6">
            با دقت پیشنهادها رو بررسی کن و بهترین تصمیم رو بگیر. تو لایق بهترین‌هایی! 🚀
          </p>
        </div>
      </div>

      {/* مودال جزئیات پیشنهاد */}
      <AnimatePresence>
        {selectedApp && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex items-end justify-center bg-ink/40 backdrop-blur-sm sm:items-center"
            onClick={() => setSelectedApp(null)}
          >
            <motion.div
              initial={{ y: "100%" }}
              animate={{ y: 0 }}
              exit={{ y: "100%" }}
              transition={{ type: "spring", damping: 30, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="w-full max-w-md rounded-t-3xl bg-paper p-6 sm:rounded-3xl"
            >
              <div className="mx-auto mb-4 h-1 w-12 rounded-full bg-line sm:hidden" />
              <button
                onClick={() => setSelectedApp(null)}
                className="absolute left-4 top-4 flex h-8 w-8 items-center justify-center rounded-full bg-bg text-muted"
              >
                <X className="h-4 w-4" />
              </button>

              <div className="mb-5 text-center">
                <div className="mx-auto mb-3 flex h-20 w-20 items-center justify-center rounded-full bg-violet/10 text-violet">
                  {selectedApp.companyLogo ? (
                    <img
                      src={selectedApp.companyLogo}
                      alt={selectedApp.companyName}
                      className="h-full w-full rounded-full object-cover"
                    />
                  ) : (
                    <Building2 className="h-10 w-10" />
                  )}
                </div>
                <h2 className="text-xl font-bold text-ink">
                  {selectedApp.companyName}
                </h2>
                <p className="mt-1 text-xs text-muted">
                  {new Date(selectedApp.createdAt).toLocaleDateString("fa-IR")}
                </p>
              </div>

              <div className="mb-5 rounded-xl bg-bg p-4">
                <p className="mb-2 flex items-center gap-1 text-xs font-medium text-muted">
                  <MessageSquare className="h-3.5 w-3.5" />
                  پیام شرکت
                </p>
                <p className="text-sm leading-7 text-ink">{selectedApp.message}</p>
              </div>

              {selectedApp.status === "pending" ? (
                <div className="flex gap-2">
                  <Button
                    variant="secondary"
                    className="flex-1"
                    onClick={() => handleUpdateStatus(selectedApp, "rejected")}
                    loading={updating}
                  >
                    <XCircle className="ml-2 h-4 w-4" />
                    رد
                  </Button>
                  <Button
                    className="flex-1"
                    onClick={() => handleUpdateStatus(selectedApp, "accepted")}
                    loading={updating}
                  >
                    <CheckCircle className="ml-2 h-4 w-4" />
                    پذیرش
                  </Button>
                </div>
              ) : (
                <div
                  className={`rounded-xl p-4 text-center text-sm font-medium ${
                    selectedApp.status === "accepted"
                      ? "bg-lime/10 text-lime-deep"
                      : "bg-cherry/10 text-cherry"
                  }`}
                >
                  {selectedApp.status === "accepted"
                    ? "✅ این پیشنهاد را پذیرفته‌ای"
                    : "❌ این پیشنهاد را رد کرده‌ای"}
                </div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}