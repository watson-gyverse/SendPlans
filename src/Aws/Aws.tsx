import axios from 'axios'
import { useCallback } from 'react'
import { Background } from '../Style/MainStyledComponents'

function AwsRequest() {
    const formData = new FormData()
    const onUploadImage = useCallback(
        (e: React.ChangeEvent<HTMLInputElement>) => {
            if (!e.target.files) {
                return
            }
            formData.append('image', e.target.files[0])
        },
        []
    )

    async function Upload(formData: FormData) {
        const url =
            'https://vp20edcx99.execute-api.ap-northeast-2.amazonaws.com/image'
        await axios
            .post(url, formData)
            .then((response) => {
                console.log(response.data)
            })
            .catch((error) => {
                console.error(error)
            })
    }

    return (
        <Background>
            <input
                type='file'
                accept='image/*'
                onChange={onUploadImage}
            />

            <button onClick={() => Upload(formData)}>업로드</button>
        </Background>
    )
}

export default AwsRequest
