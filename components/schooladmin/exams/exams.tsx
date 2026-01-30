"use client";

import { useEffect, useState } from "react";
import { MAIN_COLOR } from "@/constants/colors";
import { Trash2, FileText, Plus } from "lucide-react";
import { motion, Variants } from "framer-motion";

type Exam = {
  id: string;
  name: string;
  createdAt: string;
};

type GetExamsResponse = {
  exams: Exam[];
};

type CreateExamResponse = {
  exam: Exam;
};

export default function ExamsPage() {
  const [examName, setExamName] = useState<string>("");
  const [exams, setExams] = useState<any[]>([]);
  const [loading, setLoading] = useState<boolean>(false);
  const [creating, setCreating] = useState<boolean>(false);

  /* ---------------- Animations (FIXED) ---------------- */

  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: {
      opacity: 0,
      x: -40,
    },
    visible: {
      opacity: 1,
      x: 0,
      transition: {
        duration: 0.4,
        ease: [0.25, 0.1, 0.25, 1], // ✅ FIXED (instead of "easeOut")
      },
    },
  };

  useEffect(() => {
    fetchExams();
  }, []);

  const fetchExams = async (): Promise<void> => {
    try {
      setLoading(true);
      const res = await fetch("/api/exams/list");
      const data: GetExamsResponse = await res.json();
      setExams(data.exams);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateExam = async (): Promise<void> => {
    if (!examName.trim()) return;

    try {
      setCreating(true);
      const res = await fetch("/api/exams/create", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: examName }),
      });

      const data: CreateExamResponse = await res.json();
      setExams((prev) => [data.exam, ...prev]);
      setExamName("");
    } catch (error) {
      console.error(error);
    } finally {
      setCreating(false);
    }
  };

  return (
    <motion.div
      initial="hidden"
      animate="visible"
      variants={containerVariants}
      className="p-6 max-w-5xl"
    >
      {/* Header */}
      <motion.div variants={itemVariants}>
        <div className="flex items-center gap-2 mb-1">
          <FileText className="text-green-500" size={20} />
          <h2 className="text-xl font-semibold text-black">Exams</h2>
        </div>
        <p className="text-sm text-gray-500 mb-6">
          Create and manage exam sets
        </p>
      </motion.div>

      {/* Create Exam Card */}
      <motion.div
        variants={itemVariants}
        className="bg-white rounded-xl p-5 shadow mb-8"
      >
        <h4 className="font-medium mb-3">Create New Exam Set</h4>
        <h6 className="text-sm text-gray-500 mb-4">Exam Set Name*</h6>

        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={examName}
            onChange={(e) => setExamName(e.target.value)}
            placeholder="e.g., Term 1, Mid Term, Final Exam"
            className="flex-1 bg-gray-100 border-gray-300 rounded-md px-3 py-2 outline-none"
          />

          <button
            onClick={handleCreateExam}
            disabled={creating}
            style={{ backgroundColor: MAIN_COLOR }}
            className="
              text-white
              px-4 py-2
              rounded-md
              disabled:opacity-50
              flex items-center justify-center gap-2
              hover:opacity-90
              transition
            "
          >
            <Plus size={16} />
            Create Exam
          </button>
        </div>
      </motion.div>

      {/* Created Exams */}
      <motion.div
        variants={containerVariants}
        className="bg-white rounded-xl p-5 shadow"
      >
        <h4 className="font-medium mb-4">
           Created Exams ({Array.isArray(exams) ? exams.length : 0})
        </h4>

        {loading && <p>Loading exams...</p>}

        {!loading && exams.length === 0 && (
          <p className="text-gray-500">No exams created yet.</p>
        )}

        {!loading &&
          exams.map((exam) => (
            <motion.div
              key={exam.id}
              variants={itemVariants}
              whileHover={{ y: -2 }}
              className="
                flex justify-between items-center
                flex-col sm:flex-row
                gap-3 sm:gap-0
                border rounded-lg
                px-4 py-3 mb-3
                border-green-200
                bg-white
                hover:bg-green-50
                transition
              "
              style={{ borderColor: undefined }}
              onMouseEnter={(e) =>
                (e.currentTarget.style.borderColor = MAIN_COLOR)
              }
              onMouseLeave={(e) =>
                (e.currentTarget.style.borderColor = "#bbf7d0")
              }
            >
              {/* Left */}
              <div className="flex items-center gap-3">
                <div className="bg-green-500 text-white p-2 rounded-lg">
                  <FileText size={18} />
                </div>

                <div>
                  <p className="font-medium">{exam.name}</p>
                  <p className="text-xs text-gray-500">
                    Created on{" "}
                    {new Date(exam.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>

              {/* Delete */}
              <button className="text-red-500 hover:text-red-600 transition">
                <Trash2 size={18} />
              </button>
            </motion.div>
          ))}
      </motion.div>
    </motion.div>
  );
}
