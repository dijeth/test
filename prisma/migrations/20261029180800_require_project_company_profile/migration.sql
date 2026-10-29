-- Assign projects automatically only when their profile has exactly one work period.
UPDATE "projects" AS project
SET "companyProfileId" = company_profile."id"
FROM "company_profiles" AS company_profile
WHERE project."companyProfileId" IS NULL
  AND project."profileId" = company_profile."profileId"
  AND (
      SELECT COUNT(*)
      FROM "company_profiles" AS matching_profile
      WHERE matching_profile."profileId" = project."profileId"
  ) = 1;

-- Ambiguous or missing work-period assignments must be resolved before proceeding.
DO $$
BEGIN
    IF EXISTS (SELECT 1 FROM "projects" WHERE "companyProfileId" IS NULL) THEN
        RAISE EXCEPTION 'Cannot require projects.companyProfileId: assign every project without a company profile to a specific company_profiles.id, then retry the migration.';
    END IF;
END $$;

ALTER TABLE "projects" DROP CONSTRAINT "projects_companyProfileId_fkey";
ALTER TABLE "projects" ALTER COLUMN "companyProfileId" SET NOT NULL;
ALTER TABLE "projects" ADD CONSTRAINT "projects_companyProfileId_fkey"
    FOREIGN KEY ("companyProfileId") REFERENCES "company_profiles"("id")
    ON DELETE RESTRICT ON UPDATE CASCADE;

ALTER TABLE "projects" DROP CONSTRAINT "projects_profileId_fkey";
ALTER TABLE "projects" DROP COLUMN "profileId";
