import { styled } from 'shared/globalDeps'
import MainBackgroundBottomPart from 'assets/img/mainBackground_bottom_part.jpg'
import MainBackgroundTopPart from 'assets/img/mainBackground_top_part.jpg'

export const TopBackground = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    padding-top: calc(100% / 3.245);
    background-image: url(${MainBackgroundTopPart});

    background-size: contain;
    background-repeat: no-repeat;
    z-index: -1;
`

export const TextureBackground = styled.div`
    position: absolute;
    top: 0;
    width: 100%;
    height: 100%;
    background-image: url(${MainBackgroundBottomPart});

    background-size: contain;
    z-index: -1;
`