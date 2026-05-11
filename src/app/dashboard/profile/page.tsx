import { PageHeader } from "@/components/dashboard/page-header";
import { dashboardApi } from "@/lib/dashboard/api";

export default async function ProfilePage() {
  const user = await dashboardApi.getMe();

  return (
    <div>
      <PageHeader
        eyebrow="Profile"
        title="Manage account and delivery details."
        description="Keep billing, shipping, GST, company and contact details accurate for quotes, invoices, and dispatch."
      />
      <section className="grid gap-5 xl:grid-cols-[1fr_0.85fr]">
        <form className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <div className="grid gap-4 sm:grid-cols-2">
            <Field label="Name" value={user.name} />
            <Field label="Email" value={user.email} />
            <Field label="Phone" value={user.phone} />
            <Field label="Company" value={user.company} />
            <Field label="GST number" value={user.gstNumber ?? ""} />
          </div>
          <div className="mt-4 grid gap-4">
            <TextArea label="Billing address" value={user.billingAddress} />
            <TextArea label="Shipping address" value={user.shippingAddress} />
          </div>
          <button type="button" className="mt-5 h-11 rounded-full bg-bone px-5 text-sm font-black text-ink hover:bg-volt">
            Save profile
          </button>
        </form>

        <aside className="rounded-2xl border border-white/10 bg-white/[0.045] p-5">
          <p className="font-display text-2xl font-black">Account security</p>
          <p className="mt-3 text-sm leading-6 text-steel">
            Production systems should enforce JWT refresh rotation, role-based permissions, audit logging, and device/session controls.
          </p>
          <div className="mt-5 grid gap-3">
            {["Change password", "Manage saved addresses", "Download account data"].map((item) => (
              <button key={item} type="button" className="h-11 rounded-full border border-white/10 px-4 text-left text-sm font-black text-bone hover:bg-white/8">
                {item}
              </button>
            ))}
          </div>
        </aside>
      </section>
    </div>
  );
}

function Field({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <input defaultValue={value} className="h-11 w-full rounded-xl border border-white/10 bg-ink px-3 text-sm font-bold text-bone outline-none focus:border-volt" />
    </label>
  );
}

function TextArea({ label, value }: { label: string; value: string }) {
  return (
    <label className="block">
      <span className="mb-2 block text-xs font-black uppercase tracking-[0.16em] text-steel">{label}</span>
      <textarea defaultValue={value} rows={4} className="w-full resize-none rounded-xl border border-white/10 bg-ink p-3 text-sm leading-6 text-bone outline-none focus:border-volt" />
    </label>
  );
}
