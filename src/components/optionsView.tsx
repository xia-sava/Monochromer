import * as React from 'react';
import {Component} from 'react';
import { CircularProgress, Divider, Typography } from '@material-ui/core'
import { MuiThemeProvider, createMuiTheme } from '@material-ui/core/styles'


interface Props {
}

interface States {
    settingsPrepared: boolean;
}

export class OptionsView extends Component<Props, States> {

    constructor(props: Props) {
        super(props);
        this.state = {
            settingsPrepared: false,
        };
        browser.storage.local.get("hoge").then(() => {
            this.setState({
                settingsPrepared: true,
            })
        });
    }

    public render() {
        const theme = {
        };
        if (!this.state.settingsPrepared) {
            // settings ロード中
            return (
                <MuiThemeProvider theme={createMuiTheme(theme)}>
                    <div style={{minHeight: '100px', 'textAlign': 'center'}}>
                        <CircularProgress />
                    </div>
                </MuiThemeProvider>
            );
        }
        return (
            <MuiThemeProvider theme={createMuiTheme(theme)}>
                <div>
                    <Divider/>
                    <Typography variant={'headline'}>Monochromer 設定</Typography>
                    <div style={{ padding: 24 }}>
                        <Typography variant={'title'}>とはいえ設定項目はまだ無い</Typography>
                    </div>
                </div>
            </MuiThemeProvider>
        );
    }
}
