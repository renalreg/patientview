ALTER TABLE "pv_observation_heading"
    ADD COLUMN min_value NUMERIC(19, 2) DEFAULT NULL,
    ADD COLUMN max_value NUMERIC(19, 2) DEFAULT NULL;

UPDATE "pv_observation_heading"
SET min_value = 90,
    max_value = 170
WHERE code = 'sodium';

UPDATE "pv_observation_heading"
SET min_value = 2,
    max_value = 8.9
WHERE code = 'potassium';

UPDATE "pv_observation_heading"
SET min_value = 1,
    max_value = 199
WHERE code = 'urea';

UPDATE "pv_observation_heading"
SET min_value = 20,
    max_value = 2500
WHERE code = 'creatinine';

UPDATE "pv_observation_heading"
SET min_value = 5,
    max_value = 49
WHERE code = 'hco3';

UPDATE "pv_observation_heading"
SET min_value = 40,
    max_value = 299
WHERE code = 'bpsys';

UPDATE "pv_observation_heading"
SET min_value = 20,
    max_value = 199
WHERE code = 'bpdia';

UPDATE "pv_observation_heading"
SET min_value = 1,
    max_value = 40
WHERE code = 'glucose';

UPDATE "pv_observation_heading"
SET min_value = 0.5,
    max_value = 350
WHERE code = 'weight';

UPDATE "pv_observation_heading"
SET min_value = 10,
    max_value = 200
WHERE code = 'pulse';


