import {Card, CardContent, CardHeader, Divider, IconButton} from '@mui/material';
import * as React from 'react';
import {useState} from 'react';
import {useNavigate, useParams} from 'react-router-dom';
import {Path} from "../../services/Path";
import CheckIcon from "@mui/icons-material/Check";
import Career from "../../models/actor/player/Career";
import CareerService from "../../services/CareerService";

interface Props {
    car: Career
}

export default function CareerEdit(props: Props) {
    const {car} = props
    const { name } = useParams<{ name: string }>()
    const [career, setCareer] = useState<Career>(car)
    const [errors, setErrors] = useState({} as any)
    let navigate = useNavigate()

    const onChange = async (key: keyof Career, value: any) => {
        if (value === null || (career !== null && career[key] === value)) {
            return;
        }
        const copyCareer = {...career} as Career
        switch (key) {
            case 'name':
                copyCareer.name = value
                break
        }

        await updateCareer(copyCareer)
    }

    const updateCareer = async (copyCareer: Career) => {
        setCareer(copyCareer)
        await CareerService.updateCareer(copyCareer.name, copyCareer)
    }

    const onView = () => {
        navigate(Path.Career + name + '/view');
    }

    return (
        <Card>
            <CardHeader title={name} style={{ textAlign: 'center' }} action={<IconButton title='View' size='small' onClick={(): void => onView()}>
                <CheckIcon color='primary' fontSize='small' />
            </IconButton>}>
            </CardHeader>
            <Divider />
            <CardContent>
            </CardContent>
        </Card>
    )
}
