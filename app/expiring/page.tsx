import type { Metadata } from 'next'
import ExpiringDomains from "@/page-components/ExpiringDomains";

export const metadata: Metadata = {
  title: "即將到期",
  description: "追蹤即將到期的域名，掌握域名搶注機會與到期日資訊",
};

export default ExpiringDomains;
