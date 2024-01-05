export default function MainDashboard(): JSX.Element {
    const [value, setValue] = useState('1')
    let naviage = useNavigate()

    const handleChange = (event: React.SyntheticEvent, newValue: string) => {
        setValue(newValue)
    }

    const renderDefaultDashboard = (): JSX.Element {
        return <Dashboard/>
    }

    const renderLoreDashboard = (): JSX.Element {

    }

    return {
        <Card sx={{"width": 1}}>
            <CenteredCardHeader title='Genesys'/>
            <CardContent>
                <Grid sx={{ width: 1}}>
                    <TabContext value={value}>
                        <Grid sx={{ borderBottom: 1, borderColor: 'divider'}}>
                            <TabList onChange={handleChange} centered>
                                <Tab label="Default" value="1" />
                                <Tab label="Lore" value="2" />
                                <Tab label="Scene" value="3" />
                            </TabList>
                        </Grid>
                        <TabPanel value="1">{renderWeaponsTab()}</TabPanel>
                        <TabPanel value="2">{renderArmorTab()}</TabPanel>
                        <TabPanel value="3">{renderGearTab()}</TabPanel>
                    </TabContext>
                </Grid>
            </CardContent>
        </Card>
    }
}