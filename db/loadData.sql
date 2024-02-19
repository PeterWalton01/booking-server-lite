DELETE FROM public.treatments;;

INSERT INTO  public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (1, 'Initial assessment', 60);

INSERT INTO public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (2, 'Follow up', 40);

INSERT INTO public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (3, 'Sports massage  (short)', 30);

INSERT INTO public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (4, 'Sports massage  (long)', 60);

INSERT INTO public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (5, 'Posture analysis', 20);

INSERT INTO public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (6, 'Gait analysis', 60);

INSERT INTO public.treatments (
    "treatment_id",
    "treatment_name",
    "treatment_duration"
) VALUES (7, 'Functional movement analysis', 60);

DELETE FROM public.physios;;

INSERT INTO public.physios (
    "physio_id",
    "physio_name",
    "description"
) VALUES (1, 'Kath Wilson', 'Specialist in athletics sports injuries.');

INSERT INTO public.physios (
    "physio_id",
    "physio_name",
    "description"
) VALUES (2, 'David Allen', 'Specialist in post surgical treatments.');

INSERT INTO public.physios (
    "physio_id",
    "physio_name",
    "description"
) VALUES (3, 'Ronald Vickers', 'Specialist in tendon fatigue treatments.');


DELETE FROM public.appointments;


INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     1,
     'Rick Black',
     'Kath Wilson',
     'Initial assessment',
     '2024-01-07 12:15',
     '2024-01-07 13:15',
     'r_black@gmail.com',
     '079263748'
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     2,
     'Rick Black',
     'Kath Wilson',
     'Follow up',
     '2024-01-14 12:00',
     '2024-01-14 12:40',
     'r_black@gmail.com',
     '079263748'
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     3,
     'Rick Black',
     'Kath Wilson',
     'Posture analysis',
     '2024-01-20 12:00',
     '2024-01-20 12:20',
     'r_black@gmail.com',
     '079263748'
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     4,
     'Dave Simplex',
     'Kath Wilson',
     'Functional movement analysis',
     '2024-01-10 12:00',
     '2024-01-10 13:00',
     'davidSim@gmail.com',
     '078273748'
);


INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     5,
     'Sammy Brady',
     'David Allen',
     'Initial assessment',
     '2024-03-09 12:15',
     '2024-03-09 13:15',
     'sam_brady@gmail.com',
     '079263748'
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     6,
     'Sammy Brady',
     'David Allen',
     'Follow up',
     '2024-02-07 14:15',
     '2024-02-07 14:55',
     'sam_brady@gmail.com',
     '079263748'
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     7,
     'Sammy Brady',
     'David Allen',
     'Gait analysis',
     '2024-02-14 10:15',
     '2024-02-14 11:15',
     'sam_brady@gmail.com',
     '079263748'
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     8,
     'Donna Reid',
     'Ronald Vickers',
     'Initial assessment',
     '2024-01-08 14:15',
     '2024-01-08 15:15',
     'donna456@gmail.com',
     ''
);

INSERT INTO public.appointments (
    "appointment_id",
    "client_name",
    "physio_name",
    "treatment",
    "start_datetime",
    "end_datetime",
	"email",
	"telephone"
) VALUES (
     9,
     'Sammy Brady',
     'Ronald Vickers',
     'Follow up',
     '2024-02-21 10:00',
     '2024-02-21 10:40',
     'donna456@gmail.com',
     ''
);