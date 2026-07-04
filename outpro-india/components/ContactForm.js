"use client";

import { useState } from "react";
import { ArrowUpRight, CheckCircle2, AlertCircle } from "lucide-react";

const initialState = { name: "", email: "", company: "", message: "" };

export default function ContactForm() {
  const [form, setForm] = useState(initialState);
  const [status, setStatus] = useState("idle"); // idle | loading | success | error
  const [errorMsg, setErrorMsg] = useState("");

  function handleChange(e) {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }));
  }

  async function handleSubmit(e) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg("");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error || "Something went wrong.");
      setStatus("success");
      setForm(initialState);
    } catch (err) {
      setStatus("error");
      setErrorMsg(err.message);
    }
  }

  if (status === "success") {
    return (
      <div className="flex items-start gap-3 rounded-sm border border-ledger/30 bg-ledger-light p-6">
        <CheckCircle2 className="mt-0.5 shrink-0 text-ledger" size={20} />
        <div>
          <p className="font-medium text-ink-900">Message sent.</p>
          <p className="mt-1 text-sm text-ink-700">
            A member of the Outpro.India team will reply within one business day.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="grid gap-5">
      <div className="grid gap-5 sm:grid-cols-2">
        <Field label="Full name" name="name" value={form.name} onChange={handleChange} required />
        <Field label="Work email" name="email" type="email" value={form.email} onChange={handleChange} required />
      </div>
      <Field label="Company" name="company" value={form.company} onChange={handleChange} />
      <div>
        <label htmlFor="message" className="mb-1.5 block text-sm font-medium text-ink-900">
          What do you want to hand off?
        </label>
        <textarea
          id="message"
          name="message"
          rows={5}
          required
          value={form.message}
          onChange={handleChange}
          className="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
        />
      </div>

      {status === "error" && (
        <div className="flex items-center gap-2 text-sm text-red-600">
          <AlertCircle size={16} /> {errorMsg}
        </div>
      )}

      <button type="submit" disabled={status === "loading"} className="btn-primary w-fit disabled:opacity-60">
        {status === "loading" ? "Sending…" : "Send message"} <ArrowUpRight size={16} />
      </button>
    </form>
  );
}

function Field({ label, name, type = "text", value, onChange, required }) {
  return (
    <div>
      <label htmlFor={name} className="mb-1.5 block text-sm font-medium text-ink-900">
        {label}
      </label>
      <input
        id={name}
        name={name}
        type={type}
        required={required}
        value={value}
        onChange={onChange}
        className="w-full rounded-sm border border-line bg-white px-4 py-3 text-sm outline-none focus:border-ink-900"
      />
    </div>
  );
}
