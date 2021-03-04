import React, { useRef, Component } from 'react';
import CsvDownloadComponent from './CsvDownload';
import SearchAdsComponent from './SearchAds';
import Typography from '@material-ui/core/Typography';
import TextField from '@material-ui/core/TextField';
import Grid from '@material-ui/core/Grid';
import Button from '@material-ui/core/Button';
import Paper from '@material-ui/core/Paper';
import InputLabel from '@material-ui/core/InputLabel';
import FormLabel from '@material-ui/core/FormLabel';
import FormControl from '@material-ui/core/FormControl';
import FormGroup from '@material-ui/core/FormGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import { withStyles } from '@material-ui/core/styles';
import { API, Storage } from "aws-amplify";
import config from "../config";




const styles = theme => ({
    root: {
        '& .MuiTextField-root': {
            margin: theme.spacing(1),
            width: '25ch',
        },
    },
    paper: {
        margin: '1.5rem auto',
        width: '80%',
        padding: '1rem',
    },
    form: {
        '& .MuiFormLabel-root': {
            fontSize: '0.8rem',
        },
    },
    formLabel: {
        marginTop: '0.5rem',
    },
    formControl: {
        minWidth: 120,
    },
    largeInput: {
        maxWidth: 300,
    },
    mediumInput: {
        maxWidth: 180,
    },
    smallInput: {
        maxWidth: 100,
    },
    xsmallInput: {
        maxWidth: 60,
    },
    externalCampFields: {
        marginBottom: '0.5rem',
    },
    imageUploadButton: {
        maxWidth: 150,
    }
});

class MainForm extends Component {
    constructor(props) {
        super(props);
        this.state = {
            imageFile: null,
            displayExtCampFields: "none",
            load_aid: "",
            offer_name: "",
            offer_number: "",
            offers_source: "",
            landing_type: "",
            campaign_type: "",
            campaign_network: "",
            gid: "",
            oid: "",
            aid: "",
            cid: "",
            lid: "",
            status: "",
            start: "",
            stop: "",
            payout: "",
            payout_type: "",
            epc_override: "",
            click_amount: "",
            view_amount: "",
            budget_ep: "",
            budget_e: "",
            budget_w: "",
            budget_p: "",
            budget_type: "",
            budget_link: "",
            test_clicks_ep: "",
            test_clicks_e: "",
            test_clicks_w: "",
            test_clicks_p: "",
            brand_include: [],
            pid_include: [],
            country_include: "all",
            aid_include: "",
            aid_exclude: "",
            invoiced: "no",
            paid: "no",
            tested: "no",
            amount: "",
            notes: "",
            agency: "",
            publisher: "",
            bid_t: "",
            editor_id: "",
            title: "",
            subject: "",
            message: "",
            cta: "",
            image: "",
            final_url: "",
            use_html: false,
            html: "",
            categories: "",
            subcategories: "",
            keywords: "",
            s1: "",
            s2: "",
            s3: "",
            s4: "",
            s5: "",
            s6: "",
            s7: "",
            s8: "",
            s9: "",
            s10: "",
            s11: "",
            s12: "",
            s13: "",
            s14: "",
            s15: "",
        };
    }
    handleChange = event => {
        var id = event.target.id;
        if (id == "")
            id = event.target.name;
        this.setState({
            [id]: event.target.value
        });
    };
    handleSubmit = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            //params for creating/updating ad in dynamodb table
            const params = {
                offer_name: this.state.offer_name,
                offers_source: this.state.offers_source,
                offer_number: this.state.offer_number,
                landing_type: this.state.landing_type,
                campaign_type: this.state.campaign_type,
                campaign_network: this.state.campaign_network,
                gid: this.state.gid,
                oid: this.state.oid,
                cid: this.state.cid,
                lid: this.state.lid,
                status: this.state.status,
                start: this.state.start,
                stop: this.state.stop,
                payout: this.state.payout,
                payout_type: this.state.payout_type,
                epc_override: this.state.epc_override,
                click_amount: this.state.click_amount,
                view_amount: this.state.view_amount,
                budget_ep: this.state.budget_ep,
                budget_e: this.state.budget_e,
                budget_w: this.state.budget_w,
                budget_p: this.state.budget_p,
                budget_type: this.state.budget_type,
                budget_link: this.state.budget_link,
                test_clicks_ep: this.state.test_clicks_ep,
                test_clicks_e: this.state.test_clicks_e,
                test_clicks_w: this.state.test_clicks_w,
                test_clicks_p: this.state.test_clicks_p,
                brand_include: this.state.brand_include,
                pid_include: this.state.pid_include,
                country_include: this.state.country_include,
                aid_include: this.state.aid_include,
                aid_exclude: this.state.aid_exclude,
                invoiced: this.state.invoiced,
                paid: this.state.paid,
                tested: this.state.tested,
                amount: this.state.amount,
                notes: this.state.notes,
                agency: this.state.agency,
                publisher: this.state.publisher,
                bid_t: this.state.bid_t,
                editor_id: this.state.editor_id,
                title: this.state.title,
                subject: this.state.subject,
                message: this.state.message,
                cta: this.state.cta,
                final_url: this.state.final_url,
                use_html: this.state.use_html,
                html: this.state.html,
                categories: this.state.categories,
                subcategories: this.state.subcategories,
                keywords: this.state.keywords,
                s1: this.state.s1,
                s2: this.state.s2,
                s3: this.state.s3,
                s4: this.state.s4,
                s5: this.state.s5,
                s6: this.state.s6,
                s7: this.state.s7,
                s8: this.state.s8,
                s9: this.state.s9,
                s10: this.state.s10,
                s11: this.state.s11,
                s12: this.state.s12,
                s13: this.state.s13,
                s14: this.state.s14,
                s15: this.state.s15,
            };
            //check if entered aid exists in dynamodb table
            if (this.state.aid != "") {
                const ad = await API.get("ads", `/ads/${this.state.aid}`);
                //console.log(ad);
                if (ad.length > 0) {
                    //aid exits
                    var update = window.confirm(`An Ad with Ad ID: ${this.state.aid} already exists. Would you like to update it?`);
                    if (update) {
                        console.log('updating');
                        //add image to s3 bucket
                        const image = this.state.imageFile ? await this.s3Upload(this.state.imageFile) : null;
                        params.image = image.stored.key;
                        params.image_url = image.stored_url;
                        const update_res = await this.updateAID(params);
                        if (update_res.status)
                            window.alert(`Updated ad ${this.state.aid} succesfully`);
                    }
                    return;
                }
            }
            //add image to s3 bucket
            const image = this.state.imageFile ? await this.s3Upload(this.state.imageFile) : null;
            params.image = image.stored.key;
            params.image_url = image.stored_url;
            params.aid = this.state.aid;
            const create_res = await this.createAID(params);
            window.alert(`Created ad with Ad ID: ${create_res.aid}`);
            //clear form values after submit complete
            this.setState({
                imageFile: null,
                displayExtCampFields: "none",
                load_aid: "",
                offer_name: "",
                offer_number: "",
                offers_source: "",
                landing_type: "",
                campaign_type: "",
                campaign_network: "",
                gid: "",
                oid: "",
                aid: "",
                cid: "",
                lid: "",
                status: "",
                start: "",
                stop: "",
                payout: "",
                payout_type: "",
                epc_override: "",
                click_amount: "",
                view_amount: "",
                budget_ep: "",
                budget_e: "",
                budget_w: "",
                budget_p: "",
                budget_type: "",
                budget_link: "",
                test_clicks_ep: "",
                test_clicks_e: "",
                test_clicks_w: "",
                test_clicks_p: "",
                brand_include: [],
                pid_include: [],
                country_include: "all",
                aid_include: "",
                aid_exclude: "",
                invoiced: "no",
                paid: "no",
                tested: "no",
                amount: "",
                notes: "",
                agency: "",
                publisher: "",
                bid_t: "",
                editor_id: "",
                title: "",
                subject: "",
                message: "",
                cta: "",
                image: "",
                final_url: "",
                use_html: false,
                html: "",
                categories: "",
                subcategories: "",
                keywords: "",
                s1: "",
                s2: "",
                s3: "",
                s4: "",
                s5: "",
                s6: "",
                s7: "",
                s8: "",
                s9: "",
                s10: "",
                s11: "",
                s12: "",
                s13: "",
                s14: "",
                s15: "",
            });
        } catch (e) {
            console.log(e);
        }
    }
    createAID = content => {

        return API.post("ads", "/ads", {
            body: content
        });
    }
    s3Upload = async file => {
        const filename = file.name;
        console.log(file);
        const stored = await Storage.vault.put(filename, file, {
            acl: 'public-read',
            contentType: file.type,
        });
        const stored_url = await Storage.vault.get(stored.key);
        //console.log(file);
        return { stored, stored_url };
    }
    handleFileUpload = event => {
        if (event.target.files[0] && event.target.files[0].size > config.MAX_ATTACHMENT_SIZE) {
            alert(
                `Please pick a file smaller than ${config.MAX_ATTACHMENT_SIZE / 1000000
                } MB.`
            );
            return;
        }
        else {
            this.setState({
                imageFile: event.target.files[0],
                image: event.target.files[0].name,
            })
        }
    }
    updateAID = content => {
        return API.put("ads", `/ads/${this.state.aid}`, {
            body: content
        });
    }
    handleSearch = async event => {
        event.preventDefault();
        //setIsLoading(true);
        try {
            const ad = await this.searchAID(this.state.load_aid);
            //console.log(ad);
            const foundAd = ad[0];
            this.setState({
                offer_name: foundAd.offer_name,
                offers_source: foundAd.offers_source,
                offer_number: foundAd.offer_number,
                landing_type: foundAd.landing_type,
                campaign_type: foundAd.campaign_type,
                campaign_network: foundAd.campaign_network,
                gid: foundAd.gid,
                oid: foundAd.oid,
                aid: foundAd.aid,
                cid: foundAd.cid,
                lid: foundAd.lid,
                status: foundAd.status,
                start: foundAd.start,
                stop: foundAd.stop,
                payout: foundAd.payout,
                payout_type: foundAd.payout_type,
                epc_override: foundAd.epc_override,
                click_amount: foundAd.click_amount,
                view_amount: foundAd.view_amount,
                budget_ep: foundAd.budget_ep,
                budget_e: foundAd.budget_e,
                budget_w: foundAd.budget_w,
                budget_p: foundAd.budget_p,
                budget_type: foundAd.budget_type,
                budget_link: foundAd.budget_link,
                test_clicks_ep: foundAd.test_clicks_ep,
                test_clicks_e: foundAd.test_clicks_e,
                test_clicks_w: foundAd.test_clicks_w,
                test_clicks_p: foundAd.test_clicks_p,
                brand_include: foundAd.brand_include,
                pid_include: foundAd.pid_include,
                country_include: foundAd.country_include,
                aid_include: foundAd.aid_include,
                aid_exclude: foundAd.aid_exclude,
                invoiced: foundAd.invoiced,
                paid: foundAd.paid,
                tested: foundAd.tested,
                amount: foundAd.amount,
                notes: foundAd.notes,
                agency: foundAd.agency,
                publisher: foundAd.publisher,
                bid_t: foundAd.bid_t,
                editor_id: foundAd.editor_id,
                title: foundAd.title,
                subject: foundAd.subject,
                message: foundAd.message,
                cta: foundAd.cta,
                image: foundAd.image,
                final_url: foundAd.final_url,
                use_html: foundAd.use_html,
                html: foundAd.html,
                categories: foundAd.categories,
                subcategories: foundAd.subcategories,
                keywords: foundAd.keywords,
                s1: foundAd.s1,
                s2: foundAd.s2,
                s3: foundAd.s3,
                s4: foundAd.s4,
                s5: foundAd.s5,
                s6: foundAd.s6,
                s7: foundAd.s7,
                s8: foundAd.s8,
                s9: foundAd.s9,
                s10: foundAd.s10,
                s11: foundAd.s11,
                s12: foundAd.s12,
                s13: foundAd.s13,
                s14: foundAd.s14,
                s15: foundAd.s15,
            });
            //set the image file
            const stored_download = await Storage.vault.get(foundAd.image, { download: true });
            console.log(stored_download);
            const imageFile = new File([stored_download.Body], foundAd.image, { type: stored_download.ContentType });
            this.setState({ imageFile: imageFile });
            //console.log(this.state);
        } catch (e) {
            console.log(e);
        }
    }
    searchAID(aid) {
        return API.get("ads", `/ads/${aid}`);
    }
    onCheckBoxSelect = (event, arrayName) => {
        // current array of options
        //console.log(arrayName);
        const checkboxArr = this.state[arrayName];
        let index;
        //console.log(event.target.value);
        // check if the check box is checked or unchecked
        if (event.target.checked) {
            // add the numerical value of the checkbox to options array
            checkboxArr.push(event.target.value);
        } else {
            // or remove the value from the unchecked checkbox from the array
            index = checkboxArr.indexOf(event.target.value);
            checkboxArr.splice(index, 1);
        }

        // update the state with the new array of options
        this.setState({ arrayName: checkboxArr });
        console.log(this.state[arrayName]);
    }
    handleDisplayExternalCampFields = async event => {
        event.preventDefault();
        console.log(event.currentTarget.value);
        console.log(this.state.displayExtCampFields);
        if (event.currentTarget.value == "display") {
            event.currentTarget.value = "hide";
            this.setState({ displayExtCampFields: "" });
        }
        else {
            event.currentTarget.value = "display";
            this.setState({ displayExtCampFields: "none" });
        }
    }

    render() {
        const { classes } = this.props;
        return (
            <React.Fragment>
                <Paper className={classes.paper}>
                    <form noValidate autoComplete="off" onSubmit={this.handleSubmit} className={classes.form}>
                        <Grid container spacing={3}>
                            <CsvDownloadComponent />
                            <SearchAdsComponent />
                            <Grid item xs={12} sm={6}>
                                <Typography variant="h5" gutterBottom>
                                    Load Ad
                                </Typography>
                                <TextField
                                    id="load_aid"
                                    name="load_aid"
                                    label="Ad ID"
                                    value={this.state.load_aid}
                                    onChange={this.handleChange}
                                />
                                <Button variant="contained" color="secondary" onClick={this.handleSearch}>
                                    Load
                                </Button>
                            </Grid>
                            <Grid item xs={24} sm={12}>
                                <Typography variant="h5" gutterBottom>
                                    Create Ad
                                </Typography>
                                <FormLabel component="legend">ID</FormLabel>
                                <FormGroup row={true}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="offers_source">Offer Source</InputLabel>
                                        <Select
                                            native
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'offers_source',
                                                id: 'offers_source',
                                            }}
                                        >
                                            <option value="" />
                                            <option value="upa">upa (upalpha) </option>
                                            <option value="afd">afd (a4d)</option>
                                            <option value="sp">sp (strikepoint)</option>
                                            <option value="ap">ap (adprecise)</option>
                                            <option value="imtec">imtec (ims-tec)</option>
                                            <option value="mt">mt (mti)</option>
                                            <option value="immh">immh (ims-mh)</option>
                                            <option value="imstc">imstc (ims-stc)</option>
                                            <option value="imsmtn">imstmn (ims-smtn)</option>
                                            <option value="imtto">imtto (ims-tto)</option>
                                            <option value="imfsc">imfsc (ims-fsc)</option>
                                            <option value="lf">lf (laissez faire)</option>
                                            <option value="spr">spr (st paul research)</option>
                                            <option value="pp">pp (paradigm press)</option>
                                            <option value="ipm">ipm (investor place)</option>
                                            <option value="si">si (sir isaac pub)</option>
                                            <option value="fic">fic (finmc)</option>
                                            <option value="ler">ler (legacy)</option>
                                            <option value="bah">bah (banyan)</option>
                                            <option value="lom">lombardi</option>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id="offer_number"
                                        name="offer_number"
                                        label="Offer Number"
                                        size="small"
                                        value={this.state.offer_number}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="offer_name"
                                        name="offer_name"
                                        label="Ad Offer Name"
                                        size="small"
                                        value={this.state.offer_name}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="landing_type"
                                        name="landing_type"
                                        label="Landing Type"
                                        size="small"
                                        value={this.state.landing_type}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="campaign_type"
                                        name="campaign_type"
                                        label="Campaign Type"
                                        size="small"
                                        value={this.state.campaign_type}
                                        onChange={this.handleChange}
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="campaign_network">Campaign Network</InputLabel>
                                        <Select
                                            native
                                            onChange={this.handleChange}
                                            inputProps={{
                                                name: 'campaign_network',
                                                id: 'campaign_network',
                                            }}
                                        >
                                            <option value="" />
                                            <option value="internal">Internal</option>
                                            <option value="external">External</option>
                                            <option value="internal/external">Internal/External</option>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        className={classes.smallInput}
                                        id="gid"
                                        name="gid"
                                        label="Group ID"
                                        size="small"
                                        value={this.state.gid}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="oid"
                                        name="oid"
                                        label="Offer ID"
                                        size="small"
                                        value={this.state.oid}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="aid"
                                        name="aid"
                                        label="Ad ID"
                                        placeholder="AID"
                                        size="small"
                                        value={this.state.aid}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="cid"
                                        name="cid"
                                        label="Creative ID"
                                        size="small"
                                        value={this.state.cid}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="lid"
                                        name="lid"
                                        label="Link ID"
                                        size="small"
                                        value={this.state.lid}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormLabel component="legend" className={classes.formLabel}>Settings</FormLabel>
                                <FormGroup row={true}>
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="status">Status</InputLabel>
                                        <Select
                                            native
                                            onChange={this.handleChange}
                                            value={this.state.status}
                                            inputProps={{
                                                name: 'status',
                                                id: 'status',
                                            }}
                                        >
                                            <option value="" />
                                            <option value="active">Active</option>
                                            <option value="inactive">Inactive</option>
                                            <option value="budget_reached">Budget Reached</option>
                                            <option value="deleted">Deleted</option>
                                            <option value="before_start">Before Start</option>
                                            <option value="after_end">After End</option>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        id="start"
                                        label="Start Date"
                                        type="datetime-local"
                                        placeholder="MM/DD/YYYY HH:MM XM"
                                        size="small"
                                        value={this.state.start}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="stop"
                                        label="End Date"
                                        type="datetime-local"
                                        placeholder="MM/DD/YYYY HH:MM XM"
                                        size="small"
                                        value={this.state.stop}
                                        onChange={this.handleChange}
                                        InputLabelProps={{
                                            shrink: true,
                                        }}
                                    />
                                    <TextField
                                        id="payout"
                                        name="payout"
                                        label="Payout"
                                        size="small"
                                        value={this.state.payout}
                                        onChange={this.handleChange}
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="payout_type">Payout Type</InputLabel>
                                        <Select
                                            native
                                            onChange={this.handleChange}
                                            value={this.state.payout_type}
                                            inputProps={{
                                                name: 'payout_type',
                                                id: 'payout_type',
                                            }}
                                        >
                                            <option value="" />
                                            <option value="cpc">CPC</option>
                                            <option value="cpa">CPA</option>
                                            <option value="cpl">CPL</option>
                                            <option value="cpm">CPM</option>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        className={classes.smallInput}
                                        id="epc_override"
                                        name="epc_override"
                                        label="EPC Override"
                                        size="small"
                                        value={this.state.epc_override}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="click_amount"
                                        name="click_amount"
                                        label="Click Amount"
                                        size="small"
                                        value={this.state.click_amount}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="view_amount"
                                        name="view_amount"
                                        label="View Amount"
                                        size="small"
                                        value={this.state.view_amount}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormLabel component="legend" className={classes.formLabel}>Budget</FormLabel>
                                <FormGroup row={true}>
                                    <TextField
                                        className={classes.smallInput}
                                        id="budget_ep"
                                        name="budget_ep"
                                        label="Email Primary"
                                        placeholder="budget"
                                        size="small"
                                        value={this.state.budget_ep}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="budget_e"
                                        name="budget_e"
                                        label="Email"
                                        placeholder="budget"
                                        size="small"
                                        value={this.state.budget_e}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="budget_w"
                                        name="budget_w"
                                        label="Web"
                                        placeholder="budget"
                                        size="small"
                                        value={this.state.budget_w}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="budget_p"
                                        name="budget_p"
                                        label="Push"
                                        placeholder="budget"
                                        size="small"
                                        value={this.state.budget_p}
                                        onChange={this.handleChange}
                                    />
                                    <FormControl className={classes.formControl}>
                                        <InputLabel htmlFor="budget_type">Budget Type</InputLabel>
                                        <Select
                                            native
                                            onChange={this.handleChange}
                                            value={this.state.budget_type}
                                            inputProps={{
                                                name: 'budget_type',
                                                id: 'budget_type',
                                            }}
                                        >
                                            <option value="" />
                                            <option value="clicks">Clicks</option>
                                            <option value="views">Views</option>
                                            <option value="leads">Leads</option>
                                            <option value="sales">Sales</option>
                                            <option value="sent">Sent</option>
                                        </Select>
                                    </FormControl>
                                    <TextField
                                        className={classes.smallInput}
                                        id="budget_link"
                                        name="budget_link"
                                        label="Budget Link"
                                        size="small"
                                        value={this.state.budget_link}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <FormLabel component="legend" className={classes.formLabel}>Test Clicks Required</FormLabel>
                                <FormGroup row={true}>
                                    <TextField
                                        className={classes.smallInput}
                                        id="test_clicks_ep"
                                        name="test_clicks_ep"
                                        label="Email Primary"
                                        placeholder="test clicks"
                                        size="small"
                                        value={this.state.test_clicks_ep}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="test_clicks_e"
                                        name="test_clicks_e"
                                        label="Email"
                                        placeholder="test clicks"
                                        size="small"
                                        value={this.state.test_clicks_e}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="test_clicks_w"
                                        name="test_clicks_w"
                                        label="Web"
                                        placeholder="test clicks"
                                        size="small"
                                        value={this.state.test_clicks_w}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="test_clicks_p"
                                        name="test_clicks_p"
                                        label="Push"
                                        placeholder="test clicks"
                                        size="small"
                                        value={this.state.test_clicks_p}
                                        onChange={this.handleChange}
                                    />

                                </FormGroup>
                                <FormLabel component="legend" className={classes.formLabel}>Brand Include</FormLabel>
                                <FormGroup row={true}>
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="finstrategist" checked={(this.state.brand_include.includes("finstrategist"))} />}
                                        label="FinStrategist"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="tradereliteclub" checked={(this.state.brand_include.includes("tradereliteclub"))} />}
                                        label="TraderEliteClub"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="technicaltrading" checked={(this.state.brand_include.includes("technicaltrading"))} />}
                                        label="TechnicalTrading"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="trendadvisor" checked={(this.state.brand_include.includes("trendadvisor"))} />}
                                        label="TrendAdvisor"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="markethundred" checked={(this.state.brand_include.includes("markethundred"))} />}
                                        label="MarketHundred"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="smartmoneytrading" checked={(this.state.brand_include.includes("smartmoneytrading"))} />}
                                        label="SmartMoneyTrading"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="activatrade" checked={(this.state.brand_include.includes("activatrade"))} />}
                                        label="ActivaTrade"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="priceactionea" checked={(this.state.brand_include.includes("priceactionea"))} />}
                                        label="PriceActionEA"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'brand_include')} value="systemtrading" checked={(this.state.brand_include.includes("systemtrading"))} />}
                                        label="SystemTrading"
                                    />
                                </FormGroup>
                                <FormLabel component="legend" className={classes.formLabel}>Platform</FormLabel>
                                <FormGroup row={true}>
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'pid_include')} value="ep" checked={(this.state.pid_include.includes("ep"))} />}
                                        label="Email(primary)"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'pid_include')} value="e" checked={(this.state.pid_include.includes("e"))} />}
                                        label="Email"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'pid_include')} value="w" checked={(this.state.pid_include.includes("w"))} />}
                                        label="Web"
                                    />
                                    <FormControlLabel
                                        control={<Checkbox size='small' onChange={(e) => this.onCheckBoxSelect(e, 'pid_include')} value="p" checked={(this.state.pid_include.includes("p"))} />}
                                        label="Push"
                                    />
                                </FormGroup>
                                <FormControl component="fieldset">
                                    <FormLabel component="legend" className={classes.formLabel}>Countries</FormLabel>
                                    <RadioGroup aria-label="country_include" name="country_include" value={this.state.country_include} row={true} onChange={this.handleChange}>
                                        <FormControlLabel value="all" control={<Radio size='small' />} label="All" />
                                        <FormControlLabel value="United States" control={<Radio size='small' />} label="United States" />
                                        <FormControlLabel value="United States, Canada, United Kingdom, Australia, New Zealand" control={<Radio size='small' />} label="T1" />
                                    </RadioGroup>
                                </FormControl>

                                <FormGroup row={true}>
                                    <TextField
                                        className={classes.smallInput}
                                        id="aid_include"
                                        name="aid_include"
                                        label="Ad ID Include"
                                        size="small"
                                        value={this.state.aid_include}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        className={classes.smallInput}
                                        id="aid_exclude"
                                        name="aid_exclude"
                                        label="Ad ID Exclude"
                                        size="small"
                                        value={this.state.aid_exclude}
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <Typography variant="p">
                                    Admin
                                </Typography>
                                <FormGroup row={true}>
                                    <RadioGroup aria-label="invoiced" name="invoiced" value={this.state.invoiced} onChange={this.handleChange}>
                                        <FormLabel component="legend" className={classes.formLabel}>Invoiced</FormLabel>
                                        <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size='small' />} label="No" />
                                    </RadioGroup>
                                    <RadioGroup aria-label="paid" name="paid" value={this.state.paid} onChange={this.handleChange}>
                                        <FormLabel component="legend" className={classes.formLabel}>Paid</FormLabel>
                                        <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size='small' />} label="No" />
                                    </RadioGroup>
                                    <RadioGroup aria-label="tested" name="tested" value={this.state.tested} onChange={this.handleChange}>
                                        <FormLabel component="legend" className={classes.formLabel}>Tested</FormLabel>
                                        <FormControlLabel value="yes" control={<Radio size='small' />} label="Yes" />
                                        <FormControlLabel value="no" control={<Radio size='small' />} label="No" />
                                    </RadioGroup>
                                    <TextField
                                        className={classes.smallInput}
                                        id="amount"
                                        name="amount"
                                        label="Amount"
                                        size="small"
                                        value={this.state.amount}
                                        onChange={this.handleChange}
                                    />
                                    <TextField
                                        id="notes"
                                        label="Notes"
                                        value={this.state.notes}
                                        multiline
                                        rows={4}
                                        variant="outlined"
                                        onChange={this.handleChange}
                                    />
                                </FormGroup>
                                <Typography variant="b" gutterBottom>
                                    Creative
                                </Typography>
                                <Grid xs={12}>
                                    <Button color="secondary" value="display" onClick={this.handleDisplayExternalCampFields}>
                                        External Campaign Fields
                                    </Button>
                                    <FormGroup style={{ display: this.state.displayExtCampFields }} className={classes.externalCampFields} row={true}>
                                        <TextField
                                            className={classes.smallInput}
                                            id="agency"
                                            name="agency"
                                            label="Agency"
                                            size="small"
                                            value={this.state.agency}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.smallInput}
                                            id="publisher"
                                            name="publisher"
                                            label="Publisher"
                                            size="small"
                                            value={this.state.publisher}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.smallInput}
                                            id="bid_t"
                                            name="bid_t"
                                            label="Target Brand"
                                            size="small"
                                            value={this.state.bid_t}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.smallInput}
                                            id="editor_id"
                                            name="editor_id"
                                            label="Editor ID"
                                            size="small"
                                            value={this.state.editor_id}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            className={classes.mediumInput}
                                            id="title"
                                            name="title"
                                            label="Title"
                                            size="small"
                                            value={this.state.title}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.largeInput}
                                            id="subject"
                                            name="subject"
                                            label="Subject"
                                            size="small"
                                            value={this.state.subject}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.largeInput}
                                            id="message"
                                            label="Message"
                                            value={this.state.message}
                                            multiline
                                            rows={4}
                                            variant="outlined"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <FormGroup>
                                        <TextField
                                            className={classes.smallInput}
                                            id="cta"
                                            name="cta"
                                            label="CTA"
                                            size="small"
                                            value={this.state.cta}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            disabled
                                            className={classes.mediumInput}
                                            id="image"
                                            name="image"
                                            label="Image"
                                            size="small"
                                            value={this.state.image}
                                            onChange={this.handleChange}
                                        />
                                        <Button
                                            variant="contained"
                                            component="label"
                                            size="small"
                                            className={classes.imageUploadButton}
                                        >
                                            Upload File
                                            <input
                                                type="file"
                                                hidden
                                                onChange={this.handleFileUpload}
                                            />
                                        </Button>
                                        <TextField
                                            id="final_url"
                                            name="final_url"
                                            label="URL"
                                            size="small"
                                            value={this.state.final_url}
                                            onChange={this.handleChange}
                                        />

                                    </FormGroup>
                                    <FormGroup>
                                        <FormControlLabel
                                            control={<Checkbox size='small' id="use_html" checked={this.state.use_html} onChange={(event) => {
                                                this.setState({ ...this.state, [event.target.id]: event.target.checked }); console.log(this.state.use_html);
                                            }} />}
                                            label="Use Ad HTML"
                                        />
                                        <TextField
                                            id="html"
                                            label="HTML"
                                            value={this.state.html}
                                            multiline
                                            rows={8}
                                            variant="outlined"
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                    <Grid xs={6} s={3}>
                                        <FormGroup>
                                            <TextField
                                                id="categories"
                                                name="categories"
                                                label="Categories"
                                                size="small"
                                                value={this.state.categories}
                                                onChange={this.handleChange}
                                            />
                                            <TextField
                                                id="subcategories"
                                                name="subcategories"
                                                label="Subcategories"
                                                size="small"
                                                value={this.state.subcategories}
                                                onChange={this.handleChange}
                                            />
                                            <TextField
                                                id="keywords"
                                                name="keywords"
                                                label="Keywords"
                                                size="small"
                                                value={this.state.keywords}
                                                onChange={this.handleChange}
                                            />
                                        </FormGroup>
                                    </Grid>
                                </Grid>
                                <Grid xs={12}>
                                    <Typography variant="b" gutterBottom>
                                        Tokens
                                    </Typography>
                                    <FormGroup row={true}>
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s1"
                                            name="s1"
                                            label="s1"
                                            size="small"
                                            value={this.state.s1}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s2"
                                            name="s2"
                                            label="s2"
                                            size="small"
                                            value={this.state.s2}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s3"
                                            name="s3"
                                            label="s3"
                                            size="small"
                                            value={this.state.s3}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s4"
                                            name="s4"
                                            label="s4"
                                            size="small"
                                            value={this.state.s4}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s5"
                                            name="s5"
                                            label="s5"
                                            size="small"
                                            value={this.state.s5}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s6"
                                            name="s6"
                                            label="s6"
                                            size="small"
                                            value={this.state.s6}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s7"
                                            name="s7"
                                            label="s7"
                                            size="small"
                                            value={this.state.s7}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s8"
                                            name="s8"
                                            label="s8"
                                            size="small"
                                            value={this.state.s8}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s9"
                                            name="s9"
                                            label="s9"
                                            size="small"
                                            value={this.state.s9}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s10"
                                            name="s10"
                                            label="s10"
                                            size="small"
                                            value={this.state.s10}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s11"
                                            name="s11"
                                            label="s11"
                                            size="small"
                                            value={this.state.s11}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s12"
                                            name="s12"
                                            label="s12"
                                            size="small"
                                            value={this.state.s12}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s13"
                                            name="s13"
                                            label="s13"
                                            size="small"
                                            value={this.state.s13}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s14"
                                            name="s14"
                                            label="s14"
                                            size="small"
                                            value={this.state.s14}
                                            onChange={this.handleChange}
                                        />
                                        <TextField
                                            className={classes.xsmallInput}
                                            id="s15"
                                            name="s15"
                                            label="s15"
                                            size="small"
                                            value={this.state.s15}
                                            onChange={this.handleChange}
                                        />
                                    </FormGroup>
                                </Grid>

                            </Grid>
                            <Grid item sm={12}>
                                <Button variant="contained" color="primary" type="submit">
                                    Submit
                                </Button>
                            </Grid>
                        </Grid>
                    </form>
                </Paper>
            </React.Fragment>
        );
    }

}


export default withStyles(styles)(MainForm);