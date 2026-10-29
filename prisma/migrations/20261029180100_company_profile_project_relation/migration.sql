-- Give each company/profile work period a stable identifier.
ALTER TABLE "company_profiles" DROP CONSTRAINT "company_profiles_pkey";
ALTER TABLE "company_profiles" ADD COLUMN "id" SERIAL NOT NULL;
ALTER TABLE "company_profiles" ADD CONSTRAINT "company_profiles_pkey" PRIMARY KEY ("id");

-- Existing projects remain unassigned to a specific work period until curated.
ALTER TABLE "projects" ADD COLUMN "companyProfileId" INTEGER;
ALTER TABLE "projects" ADD CONSTRAINT "projects_companyProfileId_fkey"
    FOREIGN KEY ("companyProfileId") REFERENCES "company_profiles"("id")
    ON DELETE SET NULL ON UPDATE CASCADE;
