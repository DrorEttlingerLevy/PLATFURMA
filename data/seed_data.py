# Seed data for the PLATFURMA dashboard.
# Contains 20 moms with personal/baby info and 5 post-birth activities,
# plus enrollments mapping each mom to her signed activities.

ACTIVITIES = [
    {
        "id": "ACT-1",
        "name": "Baby Development Milestones",
        "description": "Guided sessions covering motor skills, sensory play, and developmental checkpoints.",
        "age_range_months": {"min": 0, "max": 3},
        "sessions_per_week": 1,
        "total_weeks": 8,
    },
    {
        "id": "ACT-2",
        "name": "Sensory Exploration Workshop",
        "description": "Hands-on activities stimulating touch, sight, and sound for growing babies.",
        "age_range_months": {"min": 3, "max": 6},
        "sessions_per_week": 1,
        "total_weeks": 6,
    },
    {
        "id": "ACT-3",
        "name": "Baby Swimming & Water Play",
        "description": "Gentle water introduction to build confidence and coordination.",
        "age_range_months": {"min": 4, "max": 12},
        "sessions_per_week": 2,
        "total_weeks": 10,
    },
    {
        "id": "ACT-4",
        "name": "Mommy & Baby Yoga",
        "description": "Postpartum yoga combining relaxation for moms and gentle stretching for babies.",
        "age_range_months": {"min": 6, "max": 18},
        "sessions_per_week": 1,
        "total_weeks": 12,
    },
    {
        "id": "ACT-5",
        "name": "Toddler Music & Movement",
        "description": "Rhythm, song, and movement to support language development and social skills.",
        "age_range_months": {"min": 12, "max": 24},
        "sessions_per_week": 1,
        "total_weeks": 8,
    },
]

MOMS = [
    {
        "id": "MOM-01",
        "name": "Noa Cohen",
        "phone": "+972-52-111-2001",
        "email": "noa.cohen@example.com",
        "baby_name": "Liam",
        "baby_age_months": 2,
    },
    {
        "id": "MOM-02",
        "name": "Tamar Levi",
        "phone": "+972-54-222-3002",
        "email": "tamar.levi@example.com",
        "baby_name": "Maya",
        "baby_age_months": 5,
    },
    {
        "id": "MOM-03",
        "name": "Shira Mizrahi",
        "phone": "+972-50-333-4003",
        "email": "shira.mizrahi@example.com",
        "baby_name": "Ethan",
        "baby_age_months": 8,
    },
    {
        "id": "MOM-04",
        "name": "Michal Peretz",
        "phone": "+972-52-444-5004",
        "email": "michal.peretz@example.com",
        "baby_name": "Sophia",
        "baby_age_months": 14,
    },
    {
        "id": "MOM-05",
        "name": "Yael Shapiro",
        "phone": "+972-54-555-6005",
        "email": "yael.shapiro@example.com",
        "baby_name": "Noah",
        "baby_age_months": 18,
    },
    {
        "id": "MOM-06",
        "name": "Rina Katz",
        "phone": "+972-50-666-7006",
        "email": "rina.katz@example.com",
        "baby_name": "Ava",
        "baby_age_months": 1,
    },
    {
        "id": "MOM-07",
        "name": "Dana Ben-David",
        "phone": "+972-52-777-8007",
        "email": "dana.bendavid@example.com",
        "baby_name": "Oliver",
        "baby_age_months": 4,
    },
    {
        "id": "MOM-08",
        "name": "Hila Friedman",
        "phone": "+972-54-888-9008",
        "email": "hila.friedman@example.com",
        "baby_name": "Emma",
        "baby_age_months": 7,
    },
    {
        "id": "MOM-09",
        "name": "Galit Weiss",
        "phone": "+972-50-999-0009",
        "email": "galit.weiss@example.com",
        "baby_name": "Aiden",
        "baby_age_months": 11,
    },
    {
        "id": "MOM-10",
        "name": "Sivan Azoulay",
        "phone": "+972-52-101-1010",
        "email": "sivan.azoulay@example.com",
        "baby_name": "Isabella",
        "baby_age_months": 16,
    },
    {
        "id": "MOM-11",
        "name": "Orly Goldstein",
        "phone": "+972-54-111-1111",
        "email": "orly.goldstein@example.com",
        "baby_name": "Lucas",
        "baby_age_months": 3,
    },
    {
        "id": "MOM-12",
        "name": "Miri Biton",
        "phone": "+972-50-122-1212",
        "email": "miri.biton@example.com",
        "baby_name": "Mia",
        "baby_age_months": 6,
    },
    {
        "id": "MOM-13",
        "name": "Liron Avraham",
        "phone": "+972-52-133-1313",
        "email": "liron.avraham@example.com",
        "baby_name": "James",
        "baby_age_months": 9,
    },
    {
        "id": "MOM-14",
        "name": "Keren Nachum",
        "phone": "+972-54-144-1414",
        "email": "keren.nachum@example.com",
        "baby_name": "Charlotte",
        "baby_age_months": 13,
    },
    {
        "id": "MOM-15",
        "name": "Tali Ohayon",
        "phone": "+972-50-155-1515",
        "email": "tali.ohayon@example.com",
        "baby_name": "Benjamin",
        "baby_age_months": 20,
    },
    {
        "id": "MOM-16",
        "name": "Ayelet Tzur",
        "phone": "+972-52-166-1616",
        "email": "ayelet.tzur@example.com",
        "baby_name": "Amelia",
        "baby_age_months": 2,
    },
    {
        "id": "MOM-17",
        "name": "Nirit Halevi",
        "phone": "+972-54-177-1717",
        "email": "nirit.halevi@example.com",
        "baby_name": "Elijah",
        "baby_age_months": 5,
    },
    {
        "id": "MOM-18",
        "name": "Sigal Manor",
        "phone": "+972-50-188-1818",
        "email": "sigal.manor@example.com",
        "baby_name": "Harper",
        "baby_age_months": 10,
    },
    {
        "id": "MOM-19",
        "name": "Revital Dayan",
        "phone": "+972-52-199-1919",
        "email": "revital.dayan@example.com",
        "baby_name": "Mason",
        "baby_age_months": 15,
    },
    {
        "id": "MOM-20",
        "name": "Einat Stern",
        "phone": "+972-54-200-2020",
        "email": "einat.stern@example.com",
        "baby_name": "Evelyn",
        "baby_age_months": 22,
    },
]

# Enrollments: which mom is signed up for which activity.
# Each entry references valid IDs from MOMS and ACTIVITIES.
ENROLLMENTS = [
    {"mom_id": "MOM-01", "activity_id": "ACT-1"},   # baby 2m → 0-3m activity
    {"mom_id": "MOM-02", "activity_id": "ACT-2"},   # baby 5m → 3-6m activity
    {"mom_id": "MOM-02", "activity_id": "ACT-3"},   # baby 5m → 4-12m activity
    {"mom_id": "MOM-03", "activity_id": "ACT-3"},   # baby 8m → 4-12m activity
    {"mom_id": "MOM-03", "activity_id": "ACT-4"},   # baby 8m → 6-18m activity
    {"mom_id": "MOM-04", "activity_id": "ACT-4"},   # baby 14m → 6-18m activity
    {"mom_id": "MOM-04", "activity_id": "ACT-5"},   # baby 14m → 12-24m activity
    {"mom_id": "MOM-05", "activity_id": "ACT-4"},   # baby 18m → 6-18m activity
    {"mom_id": "MOM-05", "activity_id": "ACT-5"},   # baby 18m → 12-24m activity
    {"mom_id": "MOM-06", "activity_id": "ACT-1"},   # baby 1m → 0-3m activity
    {"mom_id": "MOM-07", "activity_id": "ACT-2"},   # baby 4m → 3-6m activity
    {"mom_id": "MOM-07", "activity_id": "ACT-3"},   # baby 4m → 4-12m activity
    {"mom_id": "MOM-08", "activity_id": "ACT-3"},   # baby 7m → 4-12m activity
    {"mom_id": "MOM-08", "activity_id": "ACT-4"},   # baby 7m → 6-18m activity
    {"mom_id": "MOM-09", "activity_id": "ACT-3"},   # baby 11m → 4-12m activity
    {"mom_id": "MOM-09", "activity_id": "ACT-4"},   # baby 11m → 6-18m activity
    {"mom_id": "MOM-10", "activity_id": "ACT-4"},   # baby 16m → 6-18m activity
    {"mom_id": "MOM-10", "activity_id": "ACT-5"},   # baby 16m → 12-24m activity
    {"mom_id": "MOM-11", "activity_id": "ACT-1"},   # baby 3m → 0-3m activity
    {"mom_id": "MOM-11", "activity_id": "ACT-2"},   # baby 3m → 3-6m activity
    {"mom_id": "MOM-12", "activity_id": "ACT-2"},   # baby 6m → 3-6m activity
    {"mom_id": "MOM-12", "activity_id": "ACT-4"},   # baby 6m → 6-18m activity
    {"mom_id": "MOM-13", "activity_id": "ACT-3"},   # baby 9m → 4-12m activity
    {"mom_id": "MOM-13", "activity_id": "ACT-4"},   # baby 9m → 6-18m activity
    {"mom_id": "MOM-14", "activity_id": "ACT-4"},   # baby 13m → 6-18m activity
    {"mom_id": "MOM-14", "activity_id": "ACT-5"},   # baby 13m → 12-24m activity
    {"mom_id": "MOM-15", "activity_id": "ACT-5"},   # baby 20m → 12-24m activity
    {"mom_id": "MOM-16", "activity_id": "ACT-1"},   # baby 2m → 0-3m activity
    {"mom_id": "MOM-17", "activity_id": "ACT-2"},   # baby 5m → 3-6m activity
    {"mom_id": "MOM-17", "activity_id": "ACT-3"},   # baby 5m → 4-12m activity
    {"mom_id": "MOM-18", "activity_id": "ACT-3"},   # baby 10m → 4-12m activity
    {"mom_id": "MOM-18", "activity_id": "ACT-4"},   # baby 10m → 6-18m activity
    {"mom_id": "MOM-19", "activity_id": "ACT-4"},   # baby 15m → 6-18m activity
    {"mom_id": "MOM-19", "activity_id": "ACT-5"},   # baby 15m → 12-24m activity
    {"mom_id": "MOM-20", "activity_id": "ACT-5"},   # baby 22m → 12-24m activity
]
