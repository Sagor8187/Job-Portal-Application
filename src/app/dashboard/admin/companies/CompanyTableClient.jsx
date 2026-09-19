"use client";

import React, { useState } from "react";
import { Table } from "@heroui/react";
import {
  Check,
  CalendarXmark,
  House,
  Persons,
  Calendar,
  TriangleExclamation,
} from "@gravity-ui/icons";
import { updatecompany } from "@/lib/core/company";

export default function CompanyTableClient({ initialCompanies = [] }) {
  // Safe Array Fallback
  const safeData = Array.isArray(initialCompanies) ? initialCompanies : [];
  const [companies, setCompanies] = useState(safeData);
  const [modalOpen, setModalOpen] = useState(false);
  const [selectedCompany, setSelectedCompany] = useState(null);
  const [targetStatus, setTargetStatus] = useState("");
  const [loading, setLoading] = useState(false);

  const openConfirmationModal = (company, status) => {
    setSelectedCompany(company);
    setTargetStatus(status);
    setModalOpen(true);
  };

  const handleConfirmStatus = async (companyId) => {
    const senddata = await updatecompany(companyId,{ status: targetStatus })
    // console.log(targetStatus)
    // console.log(senddata)
  }

  return (
    <div className="w-full bg-[#0B0B0D] p-6 rounded-2xl text-slate-100 border border-white/[0.06] shadow-[0_20px_60px_-15px_rgba(0,0,0,0.7)]">
      <Table className="w-full border-collapse bg-black">
        <Table.ScrollContainer>
          <Table.Content aria-label="Company Management Table" className="w-full text-left bg-transparent">
            <Table.Header className="bg-[#131316] border-b border-white/[0.06]">
              <Table.Column isRowHeader className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316]">
                Company Info
              </Table.Column>
              <Table.Column className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316]">
                Industry
              </Table.Column>
              
              <Table.Column className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316]">
                Employees
              </Table.Column>
              <Table.Column className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316]">
                Total job
              </Table.Column>
              <Table.Column className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316]">
                Joined Date
              </Table.Column>
              <Table.Column className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316]">
                Status
              </Table.Column>
              <Table.Column className="py-3.5 px-4 text-[11px] font-semibold text-slate-500 uppercase tracking-widest bg-[#131316] text-right">
                Actions
              </Table.Column>
            </Table.Header>

            <Table.Body className="bg-transparent">
              {companies.map((company) => {
                const formattedDate = company.createdAt
                  ? new Date(company.createdAt).toLocaleDateString("en-US", {
                      month: "short",
                      day: "2-digit",
                      year: "numeric",
                    })
                  : "N/A";

                const isApproved = company.status === "Approved";
                const isRejected = company.status === "Rejected";

                return (
                  <Table.Row
                    key={company._id}
                    className="border-b border-white/[0.05] bg-[#0F0F12] hover:bg-[#18181C] transition-colors"
                  >
                    {/* Company Info */}
                    <Table.Cell className="py-4 px-4 bg-transparent">
                      <div className="flex items-center gap-3">
                        <img
                          src={company.logo || "/placeholder.png"}
                          alt={company.companyName}
                          className="w-10 h-10 rounded-full object-cover bg-[#1C1C21] border border-white/[0.08]"
                        />
                        <div>
                          <p className="font-semibold text-slate-100 capitalize tracking-tight">
                            {company.companyName}
                          </p>
                          <p className="text-xs text-slate-500 flex items-center gap-1 mt-0.5">
                            <House className="w-3 h-3 text-slate-600" />
                            {company.location}
                          </p>
                        </div>
                      </div>
                    </Table.Cell>

                    {/* Industry */}
                    <Table.Cell className="py-4 px-4 text-sm text-slate-300 bg-transparent">
                      {company.industry || "—"}
                    </Table.Cell>

                    {/* Employees */}
                    <Table.Cell className="py-4 px-4 bg-transparent">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1C1C21] text-slate-300 border border-white/[0.08]">
                        <Persons className="w-3.5 h-3.5 text-slate-500" />
                        {company.employeeRange}
                      </span>
                    </Table.Cell>
                     <Table.Cell className="py-4 px-4 bg-transparent">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium bg-[#1C1C21] text-slate-300 border border-white/[0.08]">
                        <Persons className="w-3.5 h-3.5 text-slate-500" />
                        {company.jobCount}
                      </span>
                    </Table.Cell>

                    {/* Joined Date */}
                    <Table.Cell className="py-4 px-4 text-sm text-slate-300 bg-transparent">
                      <div className="flex items-center gap-1.5">
                        <Calendar className="w-3.5 h-3.5 text-slate-500" />
                        {formattedDate}
                      </div>
                    </Table.Cell>

                    {/* Status Badge */}
                    <Table.Cell className="py-4 px-4 bg-transparent">
                      <span
                        className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium border ${
                          isApproved
                            ? "bg-emerald-500/10 text-emerald-400 border-emerald-500/20"
                            : isRejected
                            ? "bg-rose-500/10 text-rose-400 border-rose-500/20"
                            : "bg-amber-500/10 text-amber-400 border-amber-500/20"
                        }`}
                      >
                        <span
                          className={`w-1.5 h-1.5 rounded-full ${
                            isApproved ? "bg-emerald-400" : isRejected ? "bg-rose-400" : "bg-amber-400"
                          }`}
                        />
                        {company.status}
                      </span>
                    </Table.Cell>

                    {/* Actions */}
                    <Table.Cell className="py-4 px-4 text-right bg-transparent">
                      <div className="flex items-center justify-end gap-2">
                        {company.status !== "Approved" && (
                          <button
                            onClick={() => openConfirmationModal(company, "Approved")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-500/10 text-emerald-400 hover:bg-emerald-500/20 border border-emerald-500/20 text-xs font-medium transition"
                          >
                            <Check className="w-3.5 h-3.5" />
                            Approve
                          </button>
                        )}
                        {company.status !== "Rejected" && (
                          <button
                            onClick={() => openConfirmationModal(company, "Rejected")}
                            className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-rose-500/10 text-rose-400 hover:bg-rose-500/20 border border-rose-500/20 text-xs font-medium transition"
                          >
                            <CalendarXmark className="w-3.5 h-3.5" />
                            Reject
                          </button>
                        )}
                      </div>
                    </Table.Cell>
                  </Table.Row>
                );
              })}
            </Table.Body>
          </Table.Content>
        </Table.ScrollContainer>

        
      </Table>

      {/* Confirmation Modal */}
      {modalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-md animate-fadeIn">
          <div className="bg-[#141417] border border-white/[0.08] rounded-2xl p-6 max-w-sm w-full shadow-[0_25px_70px_-15px_rgba(0,0,0,0.8)]">
            <div className="flex items-center gap-3 text-amber-400 mb-3">
              <TriangleExclamation className="w-6 h-6" />
              <h3 className="text-lg font-semibold text-slate-100">Confirm Action</h3>
            </div>

            <p className="text-sm text-slate-400 mb-6">
              Are you sure you want to change status of{" "}
              <span className="font-semibold text-white">{selectedCompany?.companyName}</span> to{" "}
              <span
                className={`font-semibold ${
                  targetStatus === "Approved" ? "text-emerald-400" : "text-rose-400"
                }`}
              >
                {targetStatus}
              </span>
              ?
            </p>

            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => setModalOpen(false)}
                className="px-4 py-2 text-xs font-medium text-slate-400 hover:text-white hover:bg-white/[0.06] rounded-lg transition"
                disabled={loading}
              >
                Cancel
              </button>
              <button
                onClick={()=>handleConfirmStatus(selectedCompany?._id)}
                disabled={loading}
                className={`px-4 py-2 text-xs font-medium text-white rounded-lg transition shadow-md ${
                  targetStatus === "Approved"
                    ? "bg-emerald-600 hover:bg-emerald-500"
                    : "bg-rose-600 hover:bg-rose-500"
                }`}
              >
                {loading ? "Updating..." : `Yes, ${targetStatus}`}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}