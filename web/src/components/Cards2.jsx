import React, { useEffect, useState } from 'react';
import { Card, CardContent, Typography, Grid } from '@mui/material'; // Importe os componentes necessários

import { getBoletimOCorrencia } from "../services/boletim-ocorrencia-service";
import { getUsuarios } from "../services/usuarios-service";

export function Cards2() {
    const [examCount, setExamCount] = useState(0);
    const [urgentPercentage, setUrgentPercentage] = useState(0);
    const [patientCount, setPatientCount] = useState(0);

    useEffect(() => {
        async function fetchData() {
            try {
                const examsResponse = await getBoletimOCorrencia();
                const examsData = examsResponse.data;

                const completedExams = examsData.filter((exam) => exam.status === 'Furto');
                setExamCount(completedExams.length);

                const urgentExams = examsData.filter((exam) => exam.urgent === true);
                const urgentPercentage = (urgentExams.length / examsData.length) * 100;
                setUrgentPercentage(urgentPercentage.toFixed(2));

                const patientsResponse = await getBoletimOCorrencia();
                const patientsData = patientsResponse.data;

                setPatientCount(patientsData.length);
            } catch (error) {
                console.error(error);
            }
        }

        fetchData();
    }, []);

    const cardStyle = {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        height: '100%',
    };

    const numberStyle = {
        fontSize: '36px',
        fontWeight: 'bold',
    };

    const textStyle = {
        fontSize: '18px',
    };

    return (
        <Grid container spacing={2}>
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent style={cardStyle}>
                        <Typography variant="h5" component="div" style={numberStyle}>
                            {examCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={textStyle}>
                            Exames Concluídos
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent style={cardStyle}>
                        <Typography variant="h5" component="div" style={numberStyle}>
                            {urgentPercentage}%
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={textStyle}>
                            de Exames Urgentes
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
            <Grid item xs={12} sm={4}>
                <Card>
                    <CardContent style={cardStyle}>
                        <Typography variant="h5" component="div" style={numberStyle}>
                            {patientCount}
                        </Typography>
                        <Typography variant="body2" color="text.secondary" style={textStyle}>
                            Boletins de Ocorrência Cadastrados
                        </Typography>
                    </CardContent>
                </Card>
            </Grid>
        </Grid>
    );
}
